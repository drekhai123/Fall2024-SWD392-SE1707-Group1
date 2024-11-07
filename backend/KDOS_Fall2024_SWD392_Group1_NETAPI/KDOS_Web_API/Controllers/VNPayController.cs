using AutoMapper;
using KDOS_Web_API.Models.Domains;
using KDOS_Web_API.Models.DTOs;
using KDOS_Web_API.Repositories;
using KDOS_Web_API.Services.VNPay;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KDOS_Web_API.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class VNPayController : ControllerBase
    {
        private readonly IPaymentRepository _paymentRepository;
        private readonly IMapper mapper;
        private readonly IConfiguration _configuration;



        public VNPayController(IPaymentRepository paymentRepository, IMapper mapper, IConfiguration configuration)
        {
            this._paymentRepository = paymentRepository;
            this.mapper = mapper;
            _configuration = configuration;
        }

        // POST: api/Payments/Create
        [Authorize]
        [HttpPost("Create")]
        public async Task<IActionResult> CreatePayment([FromBody] AddNewPaymentDTO addNewPayment)
        {
            if (addNewPayment == null || addNewPayment.Amount <= 0)
            {
                return BadRequest("Invalid payment information provided.");
            }

            var paymentModel = mapper.Map<Payment>(addNewPayment);
            try
            {
                // Generate payment URL for redirecting the user to VNPay
                string paymentUrl = await _paymentRepository.CreatePayment(paymentModel, HttpContext);

                if (string.IsNullOrEmpty(paymentUrl))
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new { Message = "Failed to generate payment URL." });
                }

                var newPaymentDto = mapper.Map<PaymentDTO>(paymentModel);

                return Ok(new { NewPayment = newPaymentDto, PaymentUrl = paymentUrl });
            }
            catch (Exception ex)
            {
                // Consider logging the exception here
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = ex.Message });
            }
        }
        
        [HttpGet]
        [Route("{transactionId}")]
        public async Task<IActionResult> GetPaymentByTransactionIdAsync([FromRoute] string transactionId)
        {
            var payment = await _paymentRepository.GetPaymentByTransactionIdAsync(transactionId);

            if (payment == null)
            {
                return NotFound();
            }

            var paymentDto = mapper.Map<PaymentDTO>(payment);

            return Ok(paymentDto);
        }



        // POST: api/Payments/Execute
        [HttpPost("Execute")]
        public async Task<IActionResult> ExecutePayment([FromBody] PaymentExecuteRequest request)
        {
            try
            {
                var pay = new PayLib();

                // Retrieve the transaction ID and response code
                var transactionId = request.VnpTxnRef;
                var responseCode = request.VnpResponseCode;
                var payment = await _paymentRepository.GetPaymentByTransactionIdAsync(transactionId);

                if (payment == null)
                {
                    return NotFound(new ResponsePayment
                    {
                        Success = false,
                        StatusMessage = "Transaction not found",
                        ResponseDate = DateTime.UtcNow
                    });
                }

                // Check the response code
                if (responseCode == "00") // Payment successful
                {
                    // Update payment status to PAID
                    payment.Status = Models.Enum.PaymentStatus.PAID;
                    payment.Orders.PaymentStatus = Models.Enum.PaymentStatus.PAID;
                    // Save the updated status
                    await _paymentRepository.UpdatePaymentStatusAsync(payment);

                    // Construct the response
                    var responsePayment = new ResponsePayment
                    {
                        paymentId = payment.PaymentId,
                        VnpTransactionId = transactionId,
                        OrderId = payment.OrderId,
                        Success = true,
                        ResponseDate = DateTime.UtcNow,
                        StatusMessage = "Payment successful"
                    };

                    return Ok(responsePayment);
                }
                else if (responseCode == "24") // Payment failed
                {
                    return BadRequest(new ResponsePayment
                    {
                        Success = false,
                        StatusMessage = "Payment failed!",
                        ResponseDate = DateTime.UtcNow
                    });
                }
                else
                {
                    // Handle other response codes as necessary
                    return BadRequest(new ResponsePayment
                    {
                        Success = false,
                        StatusMessage = "Unknown response code.",
                        ResponseDate = DateTime.UtcNow
                    });
                }
            }
            catch (Exception ex)
            {
                // Log the error (ex) if necessary
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = "An error occurred while processing the payment." });
            }
        }


        // GET: api/Payments
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllPayments()
        {
            try
            {
                var payments = await _paymentRepository.GetAllPayments();

                return Ok(payments);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = ex.Message });
            }
        }
    }
}

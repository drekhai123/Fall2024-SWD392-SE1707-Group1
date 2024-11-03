using AutoMapper;
using KDOS_Web_API.Models.Domains;
using KDOS_Web_API.Models.DTOs;
using KDOS_Web_API.Repositories;
using KDOS_Web_API.Services.VNPay;
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

                // Validate the payment signature
                bool isValidSignature = pay.ValidateSignature(request.VnpSecureHash, _configuration["Vnpay:HashSecret"]);

                if (isValidSignature)
                {
                    return BadRequest(new ResponsePayment
                    {
                        Success = false,
                        StatusMessage = "Invalid payment signature" ,
                        ResponseDate = DateTime.UtcNow
                    });
                }

                // Retrieve the transaction ID and update payment status
                var transactionId = request.VnpTxnRef;
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

                // Update payment status based on VNPay's response
                payment.Status = Models.Enum.PaymentStatus.PAID;

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
            catch (Exception ex)
            {
                // Log the error and return a 500 error
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = "An error occurred while processing the payment." });
            }
        }


        // GET: api/Payments
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

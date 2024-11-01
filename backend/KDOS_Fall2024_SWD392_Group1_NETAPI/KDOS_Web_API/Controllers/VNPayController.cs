using AutoMapper;
using KDOS_Web_API.Models.Domains;
using KDOS_Web_API.Models.DTOs;
using KDOS_Web_API.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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


        public VNPayController(IPaymentRepository paymentRepository, IMapper mapper)
        {
            this._paymentRepository = paymentRepository;
            this.mapper = mapper;
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


        // GET: api/Payments/Execute
        [HttpGet("Execute")]
        public async Task<IActionResult> ExecutePayment([FromQuery] IQueryCollection query)
        {
            try
            {
                // Execute payment and get response data
                var response = await _paymentRepository.PaymentExecute(query);

                if (response.Success)
                {
                    return Ok(response);
                }
                else
                {
                    return BadRequest(new { Message = response.StatusMessage });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = ex.Message });
            }
        }



        // POST: api/Payments/Ipn
        [HttpPost("Ipn")]
        public async Task<IActionResult> HandleIpn([FromQuery] IQueryCollection query)
        {
            try
            {
                // Handle IPN request from VNPay
                var result = await _paymentRepository.PaymentExecuteIpn(query);

                if (result != null)
                {
                    return Ok(result);
                }
                else
                {
                    return BadRequest(new { Message = "Failed to process IPN notification" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = ex.Message });
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

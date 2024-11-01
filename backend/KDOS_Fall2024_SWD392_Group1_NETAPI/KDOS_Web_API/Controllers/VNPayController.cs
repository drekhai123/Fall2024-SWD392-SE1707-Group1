using KDOS_Web_API.Services.VNPay;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Web;

namespace KDOS_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VNPayController : ControllerBase
    {
        private const string VnPayUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"; // Replace with production URL
        private const string VnPayMerchantId = "X2VM8SWR"; // Your VNPAY merchant ID
        private readonly string vnp_HashSecret = "Z7XFKBO2UR0V4GJ8VTGMBXJMP4G4IX0X"; // Get this from your configuration

        [HttpGet]
        public IActionResult Index()
        {
            return Ok();
        }

        [HttpGet("payment/{amount}&{infor}&{orderinfor}")]
        public IActionResult Payment(string amount, string infor, string orderinfor)
        {
            // Get client's IP address
            var clientIPAddress = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "0.0.0.0";
            PayLib pay = new PayLib();

            pay.AddRequestData("vnp_Version", "2.1.0");
            pay.AddRequestData("vnp_Command", "pay");
            pay.AddRequestData("vnp_TmnCode", VnPayMerchantId);
            pay.AddRequestData("vnp_Amount", (Convert.ToDecimal(amount) * 100).ToString()); // Ensure amount is in the correct format
            pay.AddRequestData("vnp_BankCode", "");
            pay.AddRequestData("vnp_CreateDate", DateTime.Now.ToString("yyyyMMddHHmmss"));
            pay.AddRequestData("vnp_CurrCode", "VND");
            pay.AddRequestData("vnp_IpAddr", clientIPAddress);
            pay.AddRequestData("vnp_Locale", "vn");
            pay.AddRequestData("vnp_OrderInfo", infor);
            pay.AddRequestData("vnp_OrderType", "other");
            pay.AddRequestData("vnp_ReturnUrl", "https://localhost:5001/api/vnpay/paymentconfirm"); // Update with your actual return URL
            pay.AddRequestData("vnp_TxnRef", orderinfor);

            string paymentUrl = pay.CreateRequestUrl(VnPayUrl, vnp_HashSecret);
            return Redirect(paymentUrl);
        }

        [HttpGet("paymentconfirm")]
        public IActionResult PaymentConfirm()
        {
            if (Request.QueryString.HasValue)
            {
                var queryString = Request.QueryString.Value;
                var json = HttpUtility.ParseQueryString(queryString);

                long orderId = Convert.ToInt64(json["vnp_TxnRef"]);
                string orderInfo = json["vnp_OrderInfo"];
                long vnpayTranId = Convert.ToInt64(json["vnp_TransactionNo"]);
                string vnp_ResponseCode = json["vnp_ResponseCode"];
                string vnp_SecureHash = json["vnp_SecureHash"];
                var pos = queryString.IndexOf("&vnp_SecureHash");

                bool checkSignature = ValidateSignature(queryString.Substring(1, pos - 1), vnp_SecureHash, vnp_HashSecret);
                if (checkSignature && VnPayMerchantId == json["vnp_TmnCode"])
                {
                    if (vnp_ResponseCode == "00")
                    {
                        // Successful payment
                        return Redirect("YOUR_SUCCESS_URL"); // Replace with actual success URL
                    }
                    else
                    {
                        // Payment failed
                        return Redirect($"YOUR_FAILURE_URL?code={vnp_ResponseCode}"); // Replace with actual failure URL
                    }
                }
                else
                {
                    // Invalid signature
                    return Redirect("YOUR_INVALID_SIGNATURE_URL"); // Replace with actual URL for invalid signature
                }
            }

            // Invalid response
            return Redirect("YOUR_INVALID_RESPONSE_URL"); // Replace with actual URL for invalid response
        }

        private bool ValidateSignature(string rspraw, string inputHash, string secretKey)
        {
            string myChecksum = PayLib.HmacSHA512(secretKey, rspraw);
            return myChecksum.Equals(inputHash, StringComparison.InvariantCultureIgnoreCase);
        }
    }
}
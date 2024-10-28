using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KDOS_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VNPayController : ControllerBase
    {
        private const string VnPayUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"; // Replace with production URL
        private const string VnPayHashSecret = "YOUR_HASH_SECRET"; // Your VNPAY hash secret
        private const string VnPayMerchantId = "YOUR_MERCHANT_ID"; // Your VNPAY merchant ID
    }
}

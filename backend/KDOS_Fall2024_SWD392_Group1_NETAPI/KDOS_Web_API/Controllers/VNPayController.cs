using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KDOS_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VNPayController : ControllerBase
    {
        private const string VnPayUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"; // Replace with production URL
        private const string VnPayHashSecret = "Z7XFKBO2UR0V4GJ8VTGMBXJMP4G4IX0X"; // Your VNPAY hash secret
        private const string VnPayMerchantId = "X2VM8SWR"; // Your VNPAY merchant ID
    }
}

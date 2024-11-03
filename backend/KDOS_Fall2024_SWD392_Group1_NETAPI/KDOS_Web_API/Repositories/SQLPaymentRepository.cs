using KDOS_Web_API.Datas;
using KDOS_Web_API.Models.Domains;
using KDOS_Web_API.Services.VNPay;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Primitives;
using SendGrid.Helpers.Mail;

namespace KDOS_Web_API.Repositories
{
    public class SQLPaymentRepository : IPaymentRepository
    {
        private readonly KDOSDbContext paymentContext;
        private readonly IConfiguration _configuration;
        private readonly ILogger<SQLPaymentRepository> _logger;

        public SQLPaymentRepository(KDOSDbContext paymentContext, IConfiguration configuration, ILogger<SQLPaymentRepository> logger)
        {
            this.paymentContext = paymentContext;
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<string> CreatePayment(Payment payment, HttpContext context)
        {
            var timeZoneById = TimeZoneInfo.FindSystemTimeZoneById(_configuration["TimeZoneId"]);
            var timeNow = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, timeZoneById);
            var tick = DateTime.UtcNow.Ticks.ToString();
            var pay = new PayLib();
            var urlCallBack = _configuration["PaymentCallBack:ReturnUrl"];

            try
            {
                // Setting up VNPay request data
                pay.AddRequestData("vnp_Version", _configuration["Vnpay:Version"]);
                pay.AddRequestData("vnp_Command", _configuration["Vnpay:Command"]);
                pay.AddRequestData("vnp_TmnCode", _configuration["Vnpay:TmnCode"]);
                pay.AddRequestData("vnp_Amount", ((int)payment.Amount * 100).ToString());
                pay.AddRequestData("vnp_BankCode", _configuration["Vnpay:BankCode"]);   
                pay.AddRequestData("vnp_CreateDate", timeNow.ToString("yyyyMMddHHmmss"));
                pay.AddRequestData("vnp_CurrCode", _configuration["Vnpay:CurrCode"]);
                pay.AddRequestData("vnp_IpAddr", pay.GetIpAddress(context));
                pay.AddRequestData("vnp_Locale", _configuration["Vnpay:Locale"]);
                pay.AddRequestData("vnp_OrderInfo", $"{payment.Amount}");
                pay.AddRequestData("vnp_OrderType", _configuration["Vnpay:OrderType"]);
                pay.AddRequestData("vnp_ReturnUrl", urlCallBack);
                pay.AddRequestData("vnp_TxnRef", tick);

                // Generate the payment URL
                var paymentUrl = pay.CreateRequestUrl(_configuration["Vnpay:BaseUrl"], _configuration["Vnpay:HashSecret"]);

                // Save the payment record to the database
                payment.TransactionId = tick;
                payment.CreatedDate = timeNow;
                payment.Status = Models.Enum.PaymentStatus.PENDING; // Initial payment status
                await paymentContext.Payment.AddAsync(payment);
                await paymentContext.SaveChangesAsync();

                return paymentUrl;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred during the payment creation process with Transaction ID: {TransactionId}.", tick);
                throw new Exception("An error occurred during the payment process. Please try again later.", ex);
            }
        }
        public async Task<Payment> GetPaymentByTransactionIdAsync(string transactionId)
        {
            return await paymentContext.Payment.FirstOrDefaultAsync(p => p.TransactionId == transactionId);
        }

        public async Task UpdatePaymentStatusAsync(Payment payment)
        {
            paymentContext.Payment.Update(payment);
            await paymentContext.SaveChangesAsync();
        }
        public async Task<List<Payment>> GetAllPayments()
        {
            return await paymentContext.Payment.ToListAsync();
        }

        

        //public async Task<ErrorViewModel> PaymentExecuteIpn(IQueryCollection collections)
        //{
        //    var pay = new PayLib();

        //    // Populate response data from VNPay IPN
        //    foreach (var key in collections.Keys)
        //    {
        //        pay.AddResponseData(key, collections[key]);
        //    }

        //    // Validate IPN signature
        //    var inputHash = pay.GetResponseData("vnp_SecureHash");
        //    var vnp_HashSecret = _configuration["Vnpay:HashSecret"];
        //    bool isValidSignature = pay.ValidateSignature(inputHash, vnp_HashSecret);

        //    if (!isValidSignature)
        //    {
        //        return new ErrorViewModel { Message = "Invalid IPN signature" };
        //    }

        //    // Update payment status based on IPN
        //    var transactionId = pay.GetResponseData("vnp_TxnRef");
        //    var payment = await paymentContext.Payment.FirstOrDefaultAsync(p => p.TransactionId == transactionId);
        //    if (payment != null)
        //    {
        //        var responseCode = pay.GetResponseData("vnp_ResponseCode");
        //        payment.Status = responseCode == "00" ? Models.Enum.PaymentStatus.PAID : Models.Enum.PaymentStatus.FAILED;
        //        await paymentContext.SaveChangesAsync();
        //    }

        //    return new ErrorViewModel { Message = "Payment status updated successfully" };
        //}
    }
}
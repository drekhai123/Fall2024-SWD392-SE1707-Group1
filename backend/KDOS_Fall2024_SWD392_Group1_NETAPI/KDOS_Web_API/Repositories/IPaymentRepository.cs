using KDOS_Web_API.Models.Domains;
using Microsoft.Extensions.Primitives;

namespace KDOS_Web_API.Repositories
{
    public interface IPaymentRepository
    {
        Task<string> CreatePayment(Payment payment, HttpContext context);
        Task<List<Payment>> GetAllPayments();
        Task<Payment> GetPaymentByTransactionIdAsync(string transactionId);
        Task UpdatePaymentStatusAsync(Payment payment);
        //Task<ErrorViewModel> PaymentExecuteIpn(IQueryCollection collections);

    }
}

using KDOS_Web_API.Models.Domains;

namespace KDOS_Web_API.Repositories
{
    public interface IPaymentRepository
    {
        Task<string> CreatePayment(Payment payment, HttpContext context);
        Task<List<Payment>> GetAllPayments();
        Task<ResponsePayment> PaymentExecute(IQueryCollection collections);
        Task<ErrorViewModel> PaymentExecuteIpn(IQueryCollection collections);

    }
}

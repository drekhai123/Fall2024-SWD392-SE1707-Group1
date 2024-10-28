using KDOS_Web_API.Models.Domains;

namespace KDOS_Web_API.Repositories
{
    public interface IPaymentRepository
    {
        Task<Payment> CreatePayment(Payment transaction);
        Task<Payment> GetPaymentById(int id);
        Task<List<Payment>> GetAllPayments();
        Task UpdatePayment(Payment transaction);
    }
}

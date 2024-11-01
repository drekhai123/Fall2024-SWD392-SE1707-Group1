using KDOS_Web_API.Models.Domains;

namespace KDOS_Web_API.Repositories
{
    public interface IPaymentRepository
    {
        Task<Payment> CreatePayment(Payment transaction);
        Task<Payment> GetPaymentById(int id);
        Task<List<Payment>> GetAllPayments();
        Task UpdatePayment(int id, Payment transaction);
        Task LogResponse(ResponsePayment response); 
    }
}

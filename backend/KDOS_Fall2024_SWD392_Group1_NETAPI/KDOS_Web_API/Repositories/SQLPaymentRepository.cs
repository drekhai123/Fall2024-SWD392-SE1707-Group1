using KDOS_Web_API.Datas;
using KDOS_Web_API.Models.Domains;

namespace KDOS_Web_API.Repositories
{
    public class SQLPaymentRepository : IPaymentRepository
    {
        private readonly KDOSDbContext paymentContext;

        public SQLPaymentRepository(KDOSDbContext paymentContext)
        {
            this.paymentContext = paymentContext;
        }

        public async Task<Payment> CreatePayment(Payment transaction)
        {
            await paymentContext.Payment.AddAsync(transaction);
            await paymentContext.SaveChangesAsync();
            return transaction;
        }

        public Task<List<Payment>> GetAllPayments()
        {
            throw new NotImplementedException();
        }

        public Task<Payment> GetPaymentById(int id)
        {
            throw new NotImplementedException();
        }

        public Task LogResponse(ResponsePayment response)
        {
            throw new NotImplementedException();
        }

        public Task UpdatePayment(Payment transaction)
        {
            throw new NotImplementedException();
        }

        public Task UpdatePayment(int id, Payment transaction)
        {
            throw new NotImplementedException();
        }
    }
}

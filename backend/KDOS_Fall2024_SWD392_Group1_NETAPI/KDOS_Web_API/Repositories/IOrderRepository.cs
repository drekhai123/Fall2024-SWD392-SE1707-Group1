

using KDOS_Web_API.Models.Domains;

namespace KDOS_Web_API.Repositories
{
    public interface IOrderRepository
    {
        Task<List<Orders>> GetAllOrders();
        Task<Orders> GetOrderById(int id);
        Task<Orders> AddNewOrder(Orders order);
        Task<Orders> UpdateOrder(int id, Orders order);
        Task<Orders> DeleteOrder(int id);
        Task<List<Orders>> GetOrderByDate(DateTime date);
    }
}

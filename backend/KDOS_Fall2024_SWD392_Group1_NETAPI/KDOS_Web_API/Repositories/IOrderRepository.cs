

using KDOS_Web_API.Models.Domains;
using KDOS_Web_API.Models.DTOs;
using KDOS_Web_API.Models.Enum;

namespace KDOS_Web_API.Repositories
{
    public interface IOrderRepository
    {
        Task<List<Orders>> GetAllOrders();
        Task<Orders?> GetOrderById(int id);
        Task<Orders?> AddNewOrder(Orders order);
        Task<Orders?> UpdateOrder(int id, Orders order);
        Task<Orders?> DeleteOrder(int id);
        Task<List<Orders?>> GetOrderByDate(DateTime date);
        Task<List<Orders>> GetOrderByCustomerId(int id);
        Task<List<Orders>> GetOrderByStatus(OrderStatus status);
    }
}

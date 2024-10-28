using System;
using KDOS_Web_API.Models.Domains;

namespace KDOS_Web_API.Repositories
{
	public interface IOrderDetailsRepository
	{
        Task<List<OrderDetails>> GetAllOrderDetails();
        Task<OrderDetails?> GetOrderDetailsById(int id);
        Task<List<OrderDetails>> GetOrderDetailsByOrderId(int id);
        Task<OrderDetails?> AddNewOrderDetails(OrderDetails orderDetails);
        Task<OrderDetails?> DeleteOrderDetails(int id);
    }
}


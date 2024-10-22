using System;
using KDOS_Web_API.Datas;
using KDOS_Web_API.Models.Domains;
using Microsoft.EntityFrameworkCore;

namespace KDOS_Web_API.Repositories
{
	public class SQLOrderDetailsRepository : IOrderDetailsRepository
	{
        private readonly KDOSDbContext orderDetailContext;

        public SQLOrderDetailsRepository(KDOSDbContext orderDetailContext)
		{
            this.orderDetailContext = orderDetailContext;
        }

        public async Task<OrderDetails?> AddNewOrderDetails(OrderDetails orderDetails)
        {
            var orderModel = orderDetailContext.Orders.FirstOrDefaultAsync(x => x.OrderId == orderDetails.OrderId);
            if (orderModel == null)
            {
                return null;
            }
            await orderDetailContext.OrderDetails.AddAsync(orderDetails);
            await orderDetailContext.SaveChangesAsync();
            return orderDetails;
        }

        public async Task<OrderDetails?> DeleteOrderDetails(int id)
        {
            var detailModel = await orderDetailContext.OrderDetails.FirstOrDefaultAsync(x => x.OrderDetailsId == id);
            if (detailModel == null)
            {
                return null;
            }
            orderDetailContext.OrderDetails.Remove(detailModel);
            await orderDetailContext.SaveChangesAsync();
            return detailModel;
        }

        public async Task<List<OrderDetails>> GetAllOrderDetails()
        {
            return await orderDetailContext.OrderDetails.ToListAsync();
        }

        public async Task<OrderDetails?> GetOrderDetailsById(int id)
        {
            var detailModel = await orderDetailContext.OrderDetails.Include("FishProfile").Include("HealthStatus").FirstOrDefaultAsync(x => x.OrderDetailsId == id);
            if (detailModel == null)
            {
                return null;
            }
            return detailModel;
        }

        public async Task<OrderDetails?> GetOrderDetailsByOrderId(int id)
        {
            var orderModel = await orderDetailContext.OrderDetails.Include("FishProfile").Include("HealthStatus").FirstOrDefaultAsync(x => x.OrderId == id);
            if (orderModel == null)
            {
                return null;
            }
            return orderModel;
        }

    }
}


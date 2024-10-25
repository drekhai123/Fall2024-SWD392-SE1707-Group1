using KDOS_Web_API.Datas;
using KDOS_Web_API.Models.Domains;
using Microsoft.EntityFrameworkCore;

namespace KDOS_Web_API.Repositories
{
    public class SQLOrderRepository : IOrderRepository
    {
        private readonly KDOSDbContext orderContext;

        public SQLOrderRepository(KDOSDbContext orderContext)
        {
            this.orderContext = orderContext;
        }

        public async Task<Orders?> AddNewOrder(Orders order)
        {
          
                await orderContext.Orders.AddAsync(order);
                await orderContext.SaveChangesAsync();
                return order;

        }

        public async Task<List<Orders>> GetAllOrders()
        {
            var orderList = await orderContext.Orders.ToListAsync();
            return orderList;
        }

        public async Task<Orders?> GetOrderById(int id)
        {
            var order = await orderContext.Orders.FirstOrDefaultAsync(x => x.OrderId == id);  
            if(order == null)
            {
                return null;
            }
            return order;
        }

        public async Task<Orders?> UpdateOrder(int id, Orders order)
        {
            var orderModel = await orderContext.Orders.FirstOrDefaultAsync(x => x.OrderId == id);
            if (orderModel == null)
            {
                return null;
            }
            orderModel.SenderName = order.SenderName;
            orderModel.SenderAddress = order.SenderAddress;
            orderModel.SenderPhoneNumber = order.SenderPhoneNumber;
            orderModel.RecipientName = order.RecipientName;
            orderModel.RecipientAddress = order.RecipientAddress;
            orderModel.RecipientPhoneNumber = order.RecipientPhoneNumber;
            orderModel.DeliveryStatus = order.DeliveryStatus;
            orderModel.PaymentStatus = order.PaymentStatus;
            orderModel.TransportId = order.TransportId;
            orderModel.Quantity = order.Quantity;
            orderModel.TotalWeight = order.TotalWeight;
            orderModel.TotalCost = order.TotalCost;
            orderModel.UpdatedAt = DateTime.Now;
            await orderContext.SaveChangesAsync();


            return orderModel;
        }


        

        public Task<Orders?> DeleteOrder(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<Orders?>> GetOrderByDate(DateTime date)
        {
            throw new NotImplementedException();
        }

        public Task<List<Orders>> GetOrderByCustomerId(int id)
        {
            throw new NotImplementedException();
        }
    }
}

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

        public async Task<Orders> AddNewOrder(Orders order)
        {
            var customerExist = await orderContext.Customer.FirstOrDefaultAsync(x => x.CustomerId == order.CustomerId);
            if (customerExist == null)
            {
                return null;
            }
            else
            {
                await orderContext.Orders.AddAsync(order);
                await orderContext.SaveChangesAsync();
                return order;
            }
        }

        public async Task<List<Orders>> GetAllOrders()
        {
            var orderList = await orderContext.Orders.ToListAsync();
            return orderList;
        }

        public Task<Orders> GetOrderById(int id)
        {
            var order = orderContext.Orders.FirstOrDefaultAsync(x => x.OrderId == id);  
            if(order == null)
            {
                return null;
            }
            return order;
        }

        public Task<Orders> UpdateOrder(int id, Orders order)
        {
            var orderModel = orderContext.Orders.FirstOrDefaultAsync(x => x.OrderId == id);
            if (orderModel == null)
            {
                return null;
            }
            return orderModel;
        }

        public Task<Orders> DeleteOrder(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<Orders>> GetOrderByDate(DateTime date)
        {
            throw new NotImplementedException();
        }

    }
}

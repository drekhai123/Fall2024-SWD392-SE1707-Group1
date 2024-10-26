using KDOS_Web_API.Datas;
using KDOS_Web_API.Models.Domains;
using KDOS_Web_API.Models.DTOs;
using KDOS_Web_API.Models.Enum;
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
            if (order == null)
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




        public async Task<Orders?> DeleteOrder(int id)
        {
            // Find the existing order by ID
            var orderToDelete = await orderContext.Orders.FirstOrDefaultAsync(o => o.OrderId == id);

            // If the order doesn't exist, return null
            if (orderToDelete == null)
            {
                return null;
            }

            // Remove the order from the context and save changes
            orderContext.Orders.Remove(orderToDelete);
            await orderContext.SaveChangesAsync();

            // Return the deleted order
            return orderToDelete;
        }

        public async Task<List<Orders?>> GetOrderByDate(DateTime date)
        {
            // Find all orders created on the specified date
            var orders = await orderContext.Orders
                .Where(o => o.CreatedAt.Date == date.Date)
                .ToListAsync();

            return orders;
        }

        public async Task<List<Orders>> GetOrderByCustomerId(int id)
        {
            // Find all orders associated with the specified customer ID
            var orders = await orderContext.Orders
                .Where(o => o.CustomerId == id)
                .ToListAsync();

            return orders ?? new List<Orders>();// Return an empty list if no orders are found
        }
        public async Task<List<Orders>> GetOrderByStatus(OrderStatus status)
        {
            // Find all orders with the specified status
            var orders = await orderContext.Orders
                .Where(o => o.DeliveryStatus == status)
                .ToListAsync();

            return orders;
        }
        public async Task<Orders?> UpdateOnlyOrderStatus(int id, Orders orderStatus)
        {
            // Find the order by ID
            var order = await orderContext.Orders.FirstOrDefaultAsync(o => o.OrderId == id);

            // If the order doesn't exist, return null
            if (order == null)
            {
                return null;
            }

            // Update the order status based on the DTO
            order.DeliveryStatus = orderStatus.DeliveryStatus; // Ensure orderStatus has DeliveryStatus property
            order.UpdatedAt = DateTime.Now;

            // Save changes to the database
            await orderContext.SaveChangesAsync();

            return order;
        }
    }
}

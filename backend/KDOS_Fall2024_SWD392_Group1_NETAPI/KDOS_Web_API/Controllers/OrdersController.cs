using AutoMapper;
using KDOS_Web_API.Datas;
using KDOS_Web_API.Models.Domains;
using KDOS_Web_API.Models.DTOs;
using KDOS_Web_API.Repositories;
using Microsoft.AspNetCore.Mvc;
using KDOS_Web_API.Models.Enum;
using Microsoft.AspNetCore.Authorization;

namespace KDOS_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderRepository orderRepository;
        private readonly IMapper mapper;

        public OrdersController(IOrderRepository orderRepository, IMapper mapper)
        {
            this.orderRepository = orderRepository;
            this.mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllOrders()
        {
            var ordersList = await orderRepository.GetAllOrders();
            // Auto mapper
            var orderDto = mapper.Map<List<OrdersDTO>>(ordersList);
            // Following Best Practice
            return Ok(orderDto);
        }
        [HttpPost]
        public async Task<IActionResult> AddNewOrder([FromBody] AddNewOrderDTO addNewOrderDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var ordersModel = mapper.Map<Orders>(addNewOrderDTO);
            ordersModel.CreatedAt = DateTime.Now;
            ordersModel.UpdatedAt = DateTime.Now;
            ordersModel.DeliveryStatus = Models.Enum.OrderStatus.PENDING;
            ordersModel.PaymentStatus = Models.Enum.PaymentStatus.PENDING;
            try
            {
                ordersModel = await orderRepository.AddNewOrder(ordersModel);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "Internal server error" + ex);
            }

            // Map the newly created order back to a DTO for the response
            var newOrderDto = mapper.Map<OrdersDTO>(ordersModel);

            // Return the created order with a 201 Created status
            return CreatedAtAction(nameof(GetOrderById), new { orderId = ordersModel.OrderId }, newOrderDto);
        }
        [HttpGet]
        [Route("{orderId}")]
        public async Task<IActionResult> GetOrderById([FromRoute] int orderId)
        {
            var orderModel = await orderRepository.GetOrderById(orderId);
            if (orderModel == null)
            {
                return NotFound();
            }
            var orderDto = mapper.Map<OrdersDTO>(orderModel); // Map to the appropriate DTO
            return Ok(orderDto);
        }

        [HttpGet]
        [Route("customer/{customerId}")]
        public async Task<IActionResult> GetOrdersByCustomerId([FromRoute] int customerId)
        {
            var ordersList = await orderRepository.GetOrderByCustomerId(customerId);
            if (ordersList == null)
            {
                return NotFound();
            }
            var orderDto = mapper.Map<List<OrdersDTO>>(ordersList);
            return Ok(orderDto);
        }
        [HttpGet]
        [Route("transport/{transportId}")]
        public async Task<IActionResult> GetOrdersByTransportId([FromRoute] int transportId)
        {
            var ordersList = await orderRepository.GetOrderByTransportId(transportId);
            if (ordersList == null)
            {
                return NotFound();
            }
            var orderDto = mapper.Map<List<OrdersDTO>>(ordersList);
            return Ok(orderDto);
        }

        [HttpPut]
        [Route("{orderId}")]
        public async Task<IActionResult> UpdateOrder([FromRoute] int orderId, [FromBody] UpdateOrderDTO updateOrderDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var orderModel = await orderRepository.GetOrderById(orderId);
            if (orderModel == null)
            {
                return NotFound();
            }

            // Update the order model with the new data
            orderModel = mapper.Map(updateOrderDTO, orderModel);
            orderModel.UpdatedAt = DateTime.Now;

            try
            {
                orderModel = await orderRepository.UpdateOrderForStaff(orderId, orderModel);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "Internal server error" + ex);
            }

            // Map the updated order back to a DTO for the response
            var updatedOrderDto = mapper.Map<OrdersDTO>(orderModel);

            // Return the updated order with a 200 OK status
            return Ok(updatedOrderDto);
        }

        [HttpDelete]
        [Route("{orderId}")]
        public async Task<IActionResult> DeleteOrder([FromRoute] int orderId)
        {
            var orderModel = await orderRepository.DeleteOrder(orderId);
            if (orderModel == null)
            {
                return NotFound();
            }
            var orderDto = mapper.Map<OrdersDTO>(orderModel);
            return Ok(orderDto);
        }

        [HttpGet]
        [Route("date")]
        public async Task<IActionResult> GetOrderByDate([FromQuery] DateTime date)
        {
            var ordersList = await orderRepository.GetOrderByDate(date);
            if (ordersList == null)
            {
                return NotFound();
            }
            var orderDto = mapper.Map<List<OrdersDTO>>(ordersList);
            return Ok(orderDto);
        }

        [HttpGet]
        [Route("status")]
        public async Task<IActionResult> GetOrderByStatus([FromQuery] OrderStatus status)
        {
            var ordersList = await orderRepository.GetOrderByStatus(status);
            if (ordersList == null)
            {
                return NotFound();
            }
            var orderDto = mapper.Map<List<OrdersDTO>>(ordersList);
            return Ok(orderDto);
        }

        [HttpPut]
        [Route("{orderId}/status")]
        public async Task<IActionResult> UpdateOrderStatus([FromRoute] int orderId, [FromBody] UpdateOnlyOrderStatusDTO orderStatus)
        {
            // Validate the model state
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Retrieve the order by ID
            
                // Update the order status
               var orderModel = mapper.Map<Orders>(orderStatus);
                orderModel.UpdatedAt = DateTime.Now;
               orderModel = await orderRepository.UpdateOnlyOrderStatus(orderId, orderModel);

                // If the orderModel is still null after the update, something went wrong
                if (orderModel == null)
                {
                    return NotFound();
                }

            // Map the updated order back to a DTO for the response
            var updatedOrderDto = mapper.Map<OrdersDTO>(orderModel);

            // Return the updated order with a 200 OK status
            return Ok(updatedOrderDto);
        }
        [HttpPatch("{orderId}/transport")]
        public async Task<IActionResult> UpdateTransportIdByOrderId([FromRoute] int orderId, [FromBody] UpdateTransportInOrderDTO request)
        {
            // Validate transportId
            if (request.TransportId <= 0)
            {
                return BadRequest("Invalid transport ID.");
            }

            // Update the transport ID in the repository
            var orderModel = await orderRepository.UpdateTransportIdByOrderId(orderId, request.TransportId);

            // Check if the order was found and updated
            if (orderModel == null)
            {
                return NotFound($"Order with ID {orderId} not found.");
            }

            // Map to the DTO to return
            var orderDto = mapper.Map<OrdersDTO>(orderModel);
            return Ok(orderDto);
        }

    }
}

using AutoMapper;
using KDOS_Web_API.Datas;
using KDOS_Web_API.Models.Domains;
using KDOS_Web_API.Models.DTOs;
using KDOS_Web_API.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace KDOS_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly KDOSDbContext orderContext;
        private readonly IOrderRepository orderRepository;
        private readonly IMapper mapper;

        public OrdersController(KDOSDbContext orderContext, IOrderRepository orderRepository, IMapper mapper)
        {
            this.orderContext = orderContext;
            this.orderContext = orderContext;
            this.mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllOrders()
        {
            // This method get data DIRECTLY from database -> not best practice
            var ordersList = await orderRepository.GetAllOrders();
            // Auto mapper
            var orderDto = mapper.Map<List<OrdersDTO>>(ordersList);
            // Following Best Practice
            return Ok(orderDto);
        }
        [HttpPost]
        public async Task<IActionResult> AddNewOrder([FromBody] AddNewOrderDTO ordersDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var ordersModel = mapper.Map<Orders>(ordersDto);
            ordersModel.CreatedAt = DateTime.Now;
            ordersModel.UpdatedAt = DateTime.Now;

            try
            {
                ordersModel = await orderRepository.AddNewOrder(ordersModel);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "Internal server error");
            }

            // Map the newly created order back to a DTO for the response
            var newOrderDto = mapper.Map<AddNewOrderDTO>(ordersModel);

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

    }
}

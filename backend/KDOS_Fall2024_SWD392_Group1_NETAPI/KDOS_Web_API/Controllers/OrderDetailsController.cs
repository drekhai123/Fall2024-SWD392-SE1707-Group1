using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using KDOS_Web_API.Models.Domains;
using KDOS_Web_API.Models.DTOs;
using KDOS_Web_API.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KDOS_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailsController : ControllerBase
    {
        private readonly IOrderDetailsRepository orderDetailsRepository;
        private readonly IMapper mapper;

        public OrderDetailsController(IOrderDetailsRepository orderDetailsRepository, IMapper mapper)
        {
            this.orderDetailsRepository = orderDetailsRepository;
            this.mapper = mapper;
        }
        [HttpPost]
        public async Task<IActionResult> AddNewOrderDetails([FromBody] AddNewOrderDetailsDTO addNewOrderDetailsDTO)
        {
            var detailsModel = mapper.Map<OrderDetails>(addNewOrderDetailsDTO);
            detailsModel = await orderDetailsRepository.AddNewOrderDetails(detailsModel);
            if (detailsModel == null)
            {
                return NotFound();
            }
            var newOrderDetails = mapper.Map<OrderDetailsDTO>(detailsModel);
            return CreatedAtAction(nameof(GetOrderDetailsById), new { detailsId = detailsModel.OrderDetailsId }, newOrderDetails);
        }
        [HttpDelete]
        [Route("{detailsId}")]
        public async Task<IActionResult> DeleteKoiFish([FromRoute] int detailsId)
        {

            var detailsModel = await orderDetailsRepository.DeleteOrderDetails(detailsId);
            if (detailsModel == null)
            {
                return NotFound();
            }
            var detailsDto = mapper.Map<KoiFishDTO>(detailsModel);
            return Ok(detailsDto);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllOrderDetails()
        {
            var detailsModel = await orderDetailsRepository.GetAllOrderDetails();
            var detailsDto = mapper.Map<List<OrderDetailsDTO>>(detailsModel);
            return Ok(detailsDto);
        }

        [HttpGet]
        [Route("{detailsId}")]
        public async Task<IActionResult> GetOrderDetailsById([FromRoute] int detailsId)
        {
            var detailsModel = await orderDetailsRepository.GetOrderDetailsById(detailsId);
            if (detailsModel == null)
            {
                return NotFound();
            }
            var detailsDto = mapper.Map<OrderDetailsDTO>(detailsModel);
            return Ok(detailsDto);
        }
        [HttpGet]
        [Route("Order/{orderId}")]
        public async Task<IActionResult> GetOrderDetailsByOrderId([FromRoute] int orderId)
        {
            var detailsModel = await orderDetailsRepository.GetOrderDetailsByOrderId(orderId);
            if (detailsModel == null)
            {
                return NotFound();
            }
            var detailsDto = mapper.Map<List<OrderDetailsDTO>>(detailsModel);
            return Ok(detailsDto);
        }
        [HttpPut]
        [Route("{koiFishId}")]
        public IActionResult UpdateKoiFish()
        {
            return BadRequest("PUT method is not supported");
        }
    }
}


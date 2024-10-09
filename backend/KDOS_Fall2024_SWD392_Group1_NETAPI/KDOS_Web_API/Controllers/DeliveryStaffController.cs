using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using KDOS_Web_API.Datas;
using KDOS_Web_API.Models.Domains;
using KDOS_Web_API.Models.DTOs;
using KDOS_Web_API.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KDOS_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveryStaffController : ControllerBase
    {
        private readonly KDOSDbContext deliveryStaffContext;
        private readonly IDeliveryStaffRepository deliveryStaffRepository;
        private readonly IMapper mapper;

        public DeliveryStaffController(KDOSDbContext deliveryStaffContext, IDeliveryStaffRepository deliveryStaffRepository, IMapper mapper)
        {
            this.deliveryStaffContext = deliveryStaffContext;
            this.deliveryStaffRepository = deliveryStaffRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDeliveryStaff()
        {
            var deliveryStaffList = await deliveryStaffRepository.GetAllDeliveryStaff();
            var deliveryStaffDTO = mapper.Map<List<DeliveryStaffDTO>>(deliveryStaffList);
            return Ok(deliveryStaffDTO);
        }
        [HttpPost]
        public async Task<IActionResult> AddNewDeliveryStaff([FromBody]AddNewDeliveryStaffDTO addNewDeliveryStaffDTO)
        {
            var deliveryStaffModel = mapper.Map<DeliveryStaff>(addNewDeliveryStaffDTO);
            deliveryStaffModel = await deliveryStaffRepository.AddNewDeliveryStaff(deliveryStaffModel);
            if (deliveryStaffModel == null)
            {
                return NotFound();
            }
            else
            {
                var deliveryStaffDto = mapper.Map<DeliveryStaffDTO>(deliveryStaffModel);
                 return CreatedAtAction(nameof(GetDeliveryStaffById), new { staffId = deliveryStaffModel.StaffId }, deliveryStaffDto);
                
            }
        }
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult?> DeleteDeliveryStaff([FromHeader]int id)
        {
            var deliveryStaffModel = await deliveryStaffRepository.DeleteDeliveryStaff(id);
            if (deliveryStaffModel == null)
            {
                return null;
            }
            else
            {
                var deliveryStaffDeleted = mapper.Map<DeliveryStaffDTO>(deliveryStaffModel);
                return Ok(deliveryStaffDeleted);
            }
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult?> GetDeliveryStaffById([FromHeader] int id)
        {
            var deliveryStaff = await deliveryStaffRepository.GetDeliveryStaffById(id);
            var deliveryStaffDto = mapper.Map<DeliveryStaffDTO>(deliveryStaff);
            return Ok(deliveryStaffDto);
        }
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateDeliveryStaff([FromHeader]int id, [FromBody]UpdateDeliveryStaffDTO updateDeliveryStaffDTO)
        {
            var deliveryStaffModel = mapper.Map<DeliveryStaff>(updateDeliveryStaffDTO);
            deliveryStaffModel = await deliveryStaffRepository.UpdateDeliveryStaff(id, deliveryStaffModel);
            if (deliveryStaffModel == null)
            {
                return NotFound();
            }
            else
            {
               var deliveryStaffDto = mapper.Map<DeliveryStaffDTO>(deliveryStaffModel);
                return Ok(deliveryStaffDto);
            }
        }
    }
   
}


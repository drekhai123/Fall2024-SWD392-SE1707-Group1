using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using KDOS_Web_API.Models.Domains;
using KDOS_Web_API.Models.DTOs;
using KDOS_Web_API.Repositories;
using KDOS_Web_API.Services.MailingService;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KDOS_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HealthStatusController : ControllerBase
    {
        private readonly IHealthStatusRepository healthStatusRespository;
        private readonly IMapper mapper;

        public HealthStatusController(IHealthStatusRepository healthStatusRespository, IMapper mapper)
        {
            this.healthStatusRespository = healthStatusRespository;
            this.mapper = mapper;
        }
        [HttpPost]
        public async Task<IActionResult> AddNewHealthStatus(AddNewHealthStatusDTO addNewHealthStatusDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            // using the DTO to convert Model
            var healthModel = mapper.Map<HealthStatus>(addNewHealthStatusDTO);
            healthModel.Date = DateTime.Now; //Manually set the current time, ignore automapper
            var newHealthStatus = await healthStatusRespository.AddNewHealthStatus(healthModel);
            if (newHealthStatus == null)
            {
                return NotFound();
            }
            //Map Model back to DTO
            var healthStatusDto = mapper.Map<HealthStatusDTO>(newHealthStatus);
                // Follow best practice
                return CreatedAtAction(nameof(GetHealthStatusById), new { healthStatusId = newHealthStatus.HealthStatusId }, healthStatusDto); // Respone with code 201 - Created 
        }
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteHealthStatus([FromRoute]int id)
        {
            var healthModel = await healthStatusRespository.DeleteHealthStatus(id);
            if (healthModel == null)
            {
                return NotFound();
            }
            else
            {
                var deletedHealthDto = mapper.Map<HealthStatusDTO>(healthModel);
                return Ok(deletedHealthDto);
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetAllHealthStatusAsync()
        {
            var healthStatusList = await healthStatusRespository.GetAllHealthStatusAsync();
            var healthStatusDto = mapper.Map<List<HealthStatusDTO>>(healthStatusList);
            return Ok(healthStatusDto);
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetHealthStatusById([FromRoute]int id)
        {
            var healthModel = await healthStatusRespository.GetHealthStatusById(id);
            if (healthModel == null)
            {
                return NotFound();
            }
            else
            {
                var healthStatusDto = mapper.Map<HealthStatusDTO>(healthModel);
                return Ok(healthStatusDto);
            }
        }
        [HttpGet]
        [Route("OrderDetails/{id}")]
        public async Task<IActionResult> GetStatusOrderDetailId([FromRoute]int id)
        {
            var healthStatuslList = await healthStatusRespository.GetStatusOrderDetailId(id);
            if (healthStatuslList == null)
            {
                return NotFound();
            }
            else
            {
                var healthStatusDto = mapper.Map<List<HealthStatusDTO>>(healthStatuslList);
                return Ok(healthStatusDto);
            }
        }
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateHealthStatus([FromRoute]int id, [FromBody]UpdateHealthStatusDTO updateHealthStatusDTO)
        {

            var healthModel = mapper.Map<HealthStatus>(updateHealthStatusDTO);
            healthModel = await healthStatusRespository.UpdateHealthStatus(id,healthModel);
            if (healthModel == null)
            {
                return NotFound();
            }
            else
            {
                var healthStatusDto = mapper.Map<HealthStatusDTO>(healthModel);
                return Ok(healthStatusDto);
            }
        }
    }
}


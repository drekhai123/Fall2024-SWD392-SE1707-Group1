using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using KDOS_Web_API.Datas;
using KDOS_Web_API.Models.Domains;
using KDOS_Web_API.Models.DTOs;
using KDOS_Web_API.Models.DTOs.HealthCareStaffDTOs;
using KDOS_Web_API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KDOS_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HealthCareStaffController : ControllerBase
    {
        private readonly IHealthCareStaffRepository healthCareStaffRepository;
        private readonly IMapper mapper;

        public HealthCareStaffController(IHealthCareStaffRepository healthCareStaffRepository, IMapper mapper)
        {
            this.healthCareStaffRepository = healthCareStaffRepository;
            this.mapper = mapper;
        }
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllStaff()
        {
            // Get Model Data from DB
            var staffList = await healthCareStaffRepository.GetAllStaff();
            var staffDto = mapper.Map<List<HealthCareStaffDTO>>(staffList);
            return Ok(staffDto);
        }
        [HttpPost]
        public async Task<IActionResult> AddNewStaff(AddNewHealthCareStaffDTO addNewHealthCareStaffDTO)
        {

            var staffModel = mapper.Map<HealthCareStaff>(addNewHealthCareStaffDTO);
            staffModel.StaffStatus = Models.Enum.StaffStatus.FREE;
            staffModel = await healthCareStaffRepository.AddNewStaff(staffModel);
            if (staffModel == null)
            {
                return NotFound();
            }
            // Map model back to DTO and send to Client
            var staffDto = mapper.Map<HealthCareStaffDTO>(staffModel);
            // Best Practice
            return CreatedAtAction(nameof(GetStaffById), new { staffId = staffModel.StaffId }, staffDto);
            // nameof() run the fucntion inside (GetStaffById) => return the new staff id, and return the properties of the staff we added
        }
        [Authorize]
        [HttpPost]
        [Route("searchbyname")]
        public async Task<IActionResult> FindStaffByName([FromBody] string staffName)
        {
            //Find by name
            var staffModel = await healthCareStaffRepository.GetStaffByName(staffName);
            if (!staffModel.Any())
            {
                return NotFound();
            }
            else
            {
                //Turn Model to DTO
                var staffDto = mapper.Map<List<HealthCareStaffDTO>>(staffModel);
                return Ok(staffDto);
            }
        }
        [Authorize]
        [HttpGet]
        [Route("{staffId}")]
        public async Task<IActionResult> GetStaffById([FromRoute] int staffId)
        {
            //Find StaffModel in db
            var staffModel = await healthCareStaffRepository.GetStaffById(staffId);
            if (staffModel == null)
            {
                return NotFound();
            }
            else
            {
                //Convert Model to DTO
                var staffDto = mapper.Map<HealthCareStaffDTO>(staffModel);
                return Ok(staffDto);
            }
        }
        [Authorize]
        [HttpPut]
        [Route("{staffId}")]
        public async Task<IActionResult> UpdateStaffById([FromRoute] int staffId, [FromBody] UpdateHealthCareStaffDTO updateHealthCareStaffDTO)
        {
            //Find StaffModel in db
            var staffModel = mapper.Map<HealthCareStaff>(updateHealthCareStaffDTO);
            staffModel = await healthCareStaffRepository.UpdateStaff(staffId, staffModel);
            if (staffModel == null)
            {
                return NotFound();
            }
            else
            {
                //Turn Model back to DTO to send to Client
                var staffDto = mapper.Map<HealthCareStaffDTO>(staffModel);
                return Ok(staffDto);
            }
        }
        [Authorize]
        [HttpPatch]
        [Route("Status/{staffId}")]
        public async Task<IActionResult> UpdateStaffStatus([FromRoute] int staffId, [FromBody] UpdateHealthCareStaffStatus updateStaffDTO)
        {
            //Find StaffModel in db
            var staffModel = mapper.Map<HealthCareStaff>(updateStaffDTO);
            staffModel = await healthCareStaffRepository.UpdateStaffStatus(staffId, staffModel);
            if (staffModel == null)
            {
                return NotFound();
            }
            else
            {
                //Turn Model back to DTO to send to Client
                var staffDto = mapper.Map<HealthCareStaffDTO>(staffModel);
                return Ok(staffDto);
            }
        }
        [Authorize]
        [HttpDelete]
        [Route("{staffId}")]
        public async Task<IActionResult> DeleteStaffById([FromRoute] int staffId)
        {
            //Find StaffModel in db
            var staffModel = await healthCareStaffRepository.DeleteStaff(staffId);
            if (staffModel == null)
            {
                return NotFound();
            }
            else
            {
                //Convert Model to DTO
                var deletedstaffDto = mapper.Map<HealthCareStaffDTO>(staffModel);
                return Ok(deletedstaffDto);
            }
        }
        [Authorize]
        [HttpGet]
        [Route("HealthCareStaffAccount/{accountId}")]
        public async Task<IActionResult> GetStaffByAccountId([FromRoute] int accountId)
        {
            //Find StaffModel in db
            var staffModel = await healthCareStaffRepository.GetStaffByAccountId(accountId);
            if (staffModel == null)
            {
                return NotFound();
            }
            else
            {
                //Convert Model to DTO
                var staffDto = mapper.Map<HealthCareStaffDTO>(staffModel);
                return Ok(staffDto);
            }
        }
    }
}


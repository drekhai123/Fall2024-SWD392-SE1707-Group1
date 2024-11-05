using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using KDOS_Web_API.Datas;
using KDOS_Web_API.Models.Domains;
using KDOS_Web_API.Models.DTOs;
using KDOS_Web_API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KDOS_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class StaffController : ControllerBase
    {
        private readonly KDOSDbContext staffContext;
        private readonly IStaffRepository staffRepository;
        private readonly IMapper mapper;

        public StaffController(KDOSDbContext staffContext, IStaffRepository staffRepository, IMapper mapper)
        {
            this.staffContext = staffContext;
            this.staffRepository = staffRepository;
            this.mapper = mapper;
        }
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllStaff()
        {
            // Get Model Data from DB
            var staffList = await staffRepository.GetAllStaff();
            var staffDto = mapper.Map<List<StaffDTO>>(staffList);
            return Ok(staffDto);
        }
        [HttpPost]
        public async Task<IActionResult> AddNewStaff(AddNewStaffDTO addNewStaffDTO)
        {

            var staffModel = mapper.Map<Staff>(addNewStaffDTO);
            staffModel.StaffStatus = Models.Enum.StaffStatus.FREE;
            staffModel = await staffRepository.AddNewStaff(staffModel);
            if (staffModel == null)
            {
                return NotFound();
            }
            // Map model back to DTO and send to Client
            var staffDto = mapper.Map<StaffDTO>(staffModel);
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
            var staffModel = await staffRepository.GetStaffByName(staffName);
            if (!staffModel.Any())
            {
                return NotFound();
            }
            else
            {
                //Turn Model to DTO
                var staffDto = mapper.Map<List<StaffDTO>>(staffModel);
                return Ok(staffDto);
            }
        }
        [Authorize]
        [HttpGet]
        [Route("{staffId}")]
        public async Task<IActionResult> GetStaffById([FromRoute] int staffId)
        {
            //Find StaffModel in db
            var staffModel = await staffRepository.GetStaffById(staffId);
            if (staffModel == null)
            {
                return NotFound();
            }
            else
            {
                //Convert Model to DTO
                var staffDto = mapper.Map<StaffDTO>(staffModel);
                return Ok(staffDto);
            }
        }
        [Authorize]
        [HttpPut]
        [Route("{staffId}")]
        public async Task<IActionResult> UpdateStaffById([FromRoute] int staffId, [FromBody] UpdateStaffDTO updateStaffDTO)
        {
            //Find StaffModel in db
            var staffModel = mapper.Map<Staff>(updateStaffDTO);
            staffModel = await staffRepository.UpdateStaff(staffId, staffModel);
            if (staffModel == null)
            {
                return NotFound();
            }
            else
            {
                //Turn Model back to DTO to send to Client
                var staffDto = mapper.Map<StaffDTO>(staffModel);
                return Ok(staffDto);
            }
        }
        [Authorize]
        [HttpPut]
        [Route("Status/{staffId}")]
        public async Task<IActionResult> UpdateStaffStatus([FromRoute] int staffId, [FromBody] UpdateStaffStatusDTO updateStaffDTO)
        {
            //Find StaffModel in db
            var staffModel = mapper.Map<Staff>(updateStaffDTO);
            staffModel = await staffRepository.UpdateStaffStatus(staffId, staffModel);
            if (staffModel == null)
            {
                return NotFound();
            }
            else
            {
                //Turn Model back to DTO to send to Client
                var staffDto = mapper.Map<StaffDTO>(staffModel);
                return Ok(staffDto);
            }
        }
        [Authorize]
        [HttpDelete]
        [Route("{staffId}")]
        public async Task<IActionResult> DeleteStaffById([FromRoute] int staffId)
        {
            //Find StaffModel in db
            var staffModel = await staffRepository.DeleteStaff(staffId);
            if (staffModel == null)
            {
                return NotFound();
            }
            else
            {
                //Convert Model to DTO
                var deletedstaffDto = mapper.Map<StaffDTO>(staffModel);
                return Ok(deletedstaffDto);
            }
        }
        [Authorize]
        [HttpGet]
        [Route("/StaffAccount/{accountId}")]
        public async Task<IActionResult> GetStaffByAccountId([FromRoute] int accountId)
        {
            //Find StaffModel in db
            var staffModel = await staffRepository.GetStaffByAccountId(accountId);
            if (staffModel == null)
            {
                return NotFound();
            }
            else
            {
                //Convert Model to DTO
                var staffDto = mapper.Map<StaffDTO>(staffModel);
                return Ok(staffDto);
            }
        }
    }
}


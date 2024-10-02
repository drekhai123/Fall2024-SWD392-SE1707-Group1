using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KDOS_Web_API.Datas;
using KDOS_Web_API.Models;
using KDOS_Web_API.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KDOS_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaffController : Controller
    {
        private readonly KDOSDbContext staffContext;

        public StaffController(KDOSDbContext staffContext)
        {
            this.staffContext = staffContext;
        }
        [HttpGet]
        public IActionResult GetAllStaff()
        {
            // Get Model Data from DB
            var staffList = staffContext.Staff.ToList<Staff>();
            var staffDto = new List<StaffDTO>();
            foreach(Staff staff in staffList)
            {
                staffDto.Add(new StaffDTO
                {
                    AccountId = staff.AccountId,
                    StaffId = staff.StaffId,
                    StaffName = staff.StaffName,
                    Age = staff.Age,
                    Gender = staff.Gender,
                    PhoneNumber = staff.PhoneNumber
                }) ;
            }
            return Ok(staffDto);
        }
        [HttpPost]
        public IActionResult AddNewStaff( AddNewStaffDTO addNewStaffDTO)
        {
            var accountModel = staffContext.Account.FirstOrDefault(x => x.AccountId == addNewStaffDTO.AccountId);
            if (accountModel == null || !accountModel.Role.Equals("staff"))
            {
                return NotFound("Error 404: Account Not Found");
            }
            var staffExist = staffContext.Staff.FirstOrDefault(x => x.AccountId == addNewStaffDTO.AccountId);
            if (staffExist != null)
            {
                return BadRequest("Error 400: Account Already Exist!!!");
            }
            // turn DTO to Model
            var staffModel = new Staff
            {
                AccountId = accountModel.AccountId,
                StaffName = addNewStaffDTO.StaffName,
                Age = addNewStaffDTO.Age,
                Gender = addNewStaffDTO.Gender,
                PhoneNumber = addNewStaffDTO.PhoneNumber,
            };
            staffContext.Staff.Add(staffModel);
            staffContext.SaveChanges();
            // Map model back to DTO and send to Client
            var staffDto = new StaffDTO()
            {
                AccountId = accountModel.AccountId,
                StaffId = staffModel.StaffId,
                StaffName = staffModel.StaffName,
                Age = staffModel.Age,
                Gender = staffModel.Gender,
                PhoneNumber = staffModel.PhoneNumber
            };
            // Best Practice
            return CreatedAtAction(nameof(GetStaffById),new { staffId = staffModel.StaffId }, staffDto);
            // nameof() run the fucntion inside (GetStaffById) => return the new staff id, and return the properties of the staff we added
        }

        [HttpPost]
        [Route("searchbyname")]
        public IActionResult FindStaffByName([FromBody] String customerName)
        {
            //Find by name
            var staffModel = staffContext.Staff.FirstOrDefault(x => x.StaffName == customerName); // enforce ! to make sure name is not null
            if (staffModel == null)
            {
                return NotFound();
            }
            else
            {
                //Turn Model to DTO
                var staffDto = new StaffDTO
                {
                    AccountId = staffModel.AccountId,
                    StaffId = staffModel.StaffId,
                    StaffName = staffModel.StaffName,
                    Age = staffModel.Age,
                    Gender = staffModel.Gender,
                    PhoneNumber = staffModel.PhoneNumber
                };
                return Ok(staffDto);
            }
        }

        [HttpGet]
        [Route("{staffId}")]
        public IActionResult GetStaffById([FromRoute] int staffId)
        {
            //Find StaffModel in db
            var staffModel = staffContext.Staff.FirstOrDefault(x => x.StaffId == staffId);
            if(staffModel == null)
            {
                return NotFound();
            }
            else
            {
                //Convert Model to DTO
                var staffDto = new StaffDTO
                {
                    AccountId = staffModel.AccountId,
                    StaffId = staffModel.StaffId,
                    StaffName = staffModel.StaffName,
                    Age = staffModel.Age,
                    Gender = staffModel.Gender,
                    PhoneNumber = staffModel.PhoneNumber,
                };
                return Ok(staffDto);
            }
        }
        [HttpPut]
        [Route("{staffId}")]
        public IActionResult UpdateStaffById([FromRoute] int staffId, [FromBody] UpdateStaffDTO updateStaffDTO)
        {
            //Find StaffModel in db
            var staffModel = staffContext.Staff.FirstOrDefault(x => x.StaffId == staffId);
            if (staffModel == null)
            {
                return NotFound();
            }
            else
            {
                //Convert Client Data (DTO) to Model
                staffModel.StaffName = updateStaffDTO.StaffName;
                staffModel.Age = updateStaffDTO.Age;
                staffModel.Gender = updateStaffDTO.Gender;
                staffModel.PhoneNumber = updateStaffDTO.PhoneNumber;
                staffContext.SaveChanges();
                //Turn Model back to DTO to send to Client
                var staffDto = new StaffDTO
                {
                    AccountId = staffModel.AccountId,
                    StaffId = staffModel.StaffId,
                    StaffName = staffModel.StaffName,
                    Age = staffModel.Age,
                    Gender = staffModel.Gender,
                    PhoneNumber = staffModel.PhoneNumber
                };
                return Ok(staffDto);
            }
        }

        [HttpDelete]
        [Route("{staffId}")]
        public IActionResult DeleteStaffById([FromRoute] int staffId)
        {
            //Find StaffModel in db
            var staffModel = staffContext.Staff.FirstOrDefault(x => x.StaffId == staffId);
            if (staffModel == null)
            {
                return NotFound();
            }
            else
            {
                staffContext.Staff.Remove(staffModel);
                staffContext.SaveChanges();
                //Convert Model to DTO
                var deletedstaffDto = new StaffDTO
                {
                    AccountId = staffModel.AccountId,
                    StaffId = staffModel.StaffId,
                    StaffName = staffModel.StaffName,
                    Age = staffModel.Age,
                    Gender = staffModel.Gender,
                    PhoneNumber = staffModel.PhoneNumber
                };
                return Ok(deletedstaffDto);
            }
        }
    }
}


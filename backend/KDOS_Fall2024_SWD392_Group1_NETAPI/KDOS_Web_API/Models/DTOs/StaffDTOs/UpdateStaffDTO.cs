
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KDOS_Web_API.Models.DTOs
{
	public class UpdateStaffDTO
	{
        [Required]
        required public string StaffName { get; set; }
        [Required]
        required public DateOnly Dob { get; set; }
        [Required]
        required public string Gender { get; set; }
        [Required]
        required public string PhoneNumber { get; set; }
       
    }
}


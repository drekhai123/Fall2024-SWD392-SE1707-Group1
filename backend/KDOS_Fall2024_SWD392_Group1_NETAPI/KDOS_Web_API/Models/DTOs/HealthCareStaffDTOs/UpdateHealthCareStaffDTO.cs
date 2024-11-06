using System;
using KDOS_Web_API.Models.Domains;
using KDOS_Web_API.Models.Enum;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models.DTOs
{
	public class UpdateHealthCareStaffDTO
	{
        required public string StaffName { get; set; }
        [Required]
        required public DateOnly Dob { get; set; }
        [Required]
        required public string Gender { get; set; }
        [Required]
        required public string PhoneNumber { get; set; }
    }
}



using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KDOS_Web_API.Models.DTOs
{
	public class UpdateStaffDTO
	{
        [Required]
        required public String StaffName { get; set; }
        [Required]
        required public int Age { get; set; }
        [Required]
        required public String Gender { get; set; }
        [Required]
        required public String PhoneNumber { get; set; }
       
    }
}


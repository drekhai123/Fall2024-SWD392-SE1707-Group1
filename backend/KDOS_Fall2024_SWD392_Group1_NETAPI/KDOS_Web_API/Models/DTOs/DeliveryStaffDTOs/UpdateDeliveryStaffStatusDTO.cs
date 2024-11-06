using System;
using System.ComponentModel.DataAnnotations;
using KDOS_Web_API.Models.Enum;

namespace KDOS_Web_API.Models.DTOs
{
	public class UpdateDeliveryStaffStatusDTO
	{
        [Required]
        required public StaffStatus StaffStatus { get; set; }
    }
}


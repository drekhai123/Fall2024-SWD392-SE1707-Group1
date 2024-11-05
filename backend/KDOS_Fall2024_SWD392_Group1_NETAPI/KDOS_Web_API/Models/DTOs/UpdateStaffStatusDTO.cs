
using System;
using KDOS_Web_API.Models.Enum;

namespace KDOS_Web_API.Models.DTOs
{
	public class UpdateStaffStatusDTO
	{
        required public StaffStatus StaffStatus { get; set; }
    }
}


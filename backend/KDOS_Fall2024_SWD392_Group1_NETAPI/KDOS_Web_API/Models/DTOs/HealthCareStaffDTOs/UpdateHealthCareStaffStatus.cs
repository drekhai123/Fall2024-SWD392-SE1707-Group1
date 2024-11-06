using System;
using KDOS_Web_API.Models.Domains;
using KDOS_Web_API.Models.Enum;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models.DTOs
{
	public class UpdateHealthCareStaffStatus
	{
        required public StaffStatus StaffStatus { get; set; }
    }
}


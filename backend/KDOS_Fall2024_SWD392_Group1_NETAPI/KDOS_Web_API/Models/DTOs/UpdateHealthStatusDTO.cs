using System;
namespace KDOS_Web_API.Models.DTOs
{
	public class UpdateHealthStatusDTO
	{
        required public String Status { get; set; }
        required public String Description { get; set; }
    }
}


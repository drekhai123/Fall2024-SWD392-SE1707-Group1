using System;
namespace KDOS_Web_API.Models.DTOs
{
	public class UpdateHealthStatusDTO
	{
        required public String Status { get; set; }
        required public float Temperature { get; set; }
        required public float OxygenLevel { get; set; }
        required public float PHLevel { get; set; }
        required public String Notes { get; set; }
    }
}


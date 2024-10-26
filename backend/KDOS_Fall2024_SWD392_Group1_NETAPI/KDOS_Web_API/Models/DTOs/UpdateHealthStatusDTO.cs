using System;
using KDOS_Web_API.Models.Enum;

namespace KDOS_Web_API.Models.DTOs
{
	public class UpdateHealthStatusDTO
	{
        required public FishHealthStatus Status { get; set; }
        required public float Temperature { get; set; }
        required public float OxygenLevel { get; set; }
        required public float PHLevel { get; set; }
        required public string Notes { get; set; }
    }
}


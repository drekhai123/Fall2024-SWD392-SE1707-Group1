using System;
using KDOS_Web_API.Models.Domains;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models.DTOs
{
	public class UpdateFishProfileDTO
	{
        [Required]
        required public float Weight { get; set; }
        [Required]
        required public string Gender { get; set; }
        [Required]
        required public string Notes { get; set; }
        [Required]
        required public string Image { get; set; }
    }
}


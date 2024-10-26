using System;
using KDOS_Web_API.Models.Domains;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models.DTOs
{
	public class FishProfileDTO
	{
        [Key]
        public int FishProfileId { get; set; }
        [Required]
        required public float Weight { get; set; }
        [Required]
        required public string Gender { get; set; }
        [Required]
        required public string Notes { get; set; }
        [Required]
        public int KoiFishId { get; set; }
        public int CustomerId { get; set; }
        public KoiFishDTO KoiFish { get; set; } = null!;
    }
}


using System;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models.Domains
{
	public class FishProfile
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
        required public string Image { get; set; }
        [Required]
        public int KoiFishId { get; set; } // Fish Species (Type)
        public int CustomerId { get; set; }
        public Customer Customer { get; set; } = null!;
        public KoiFish KoiFish { get; set; } = null!;
        public OrderDetails OrderDetails { get; set; } = null!; // REQUIRED relationship
    }
}


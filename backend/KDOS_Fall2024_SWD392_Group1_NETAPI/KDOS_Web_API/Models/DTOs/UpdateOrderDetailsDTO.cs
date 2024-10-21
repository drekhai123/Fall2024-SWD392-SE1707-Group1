using System;
using KDOS_Web_API.Models.Domains;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models.DTOs
{
	public class UpdateOrderDetailsDTO
	{
        [Key]
        public int OrderDetailsId { get; set; }
        // Relationships
        public int FishProfileId { get; set; }
        public int OrderId { get; set; } // Foreign key
    }
}


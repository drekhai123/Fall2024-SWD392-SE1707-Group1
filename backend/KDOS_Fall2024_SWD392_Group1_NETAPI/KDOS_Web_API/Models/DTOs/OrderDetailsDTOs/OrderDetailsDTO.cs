using System;
using KDOS_Web_API.Models.Domains;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models.DTOs
{
	public class OrderDetailsDTO
	{
        [Key]
        public int OrderDetailsId { get; set; }
        // Relationships
        public int FishProfileId { get; set; }
        public int OrderId { get; set; } // Foreign key
        public FishProfileDTO FishProfile { get; set; } = null!; // One-to-one relationship with Fish
        public ICollection<HealthStatusDTO> HealthStatus { get; set; } = null!; // Many-to-one relationship with HealthStatus
    }
}


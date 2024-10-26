using System;
using System.ComponentModel.DataAnnotations;
using KDOS_Web_API.Models.Domains;

namespace KDOS_Web_API.Models.Domains
{
    public class OrderDetails
    {
        [Key]
        public int OrderDetailsId { get; set; }
        // Relationships
        public int FishProfileId { get; set; }
        public int OrderId { get; set; } // Foreign key
        public Orders Order { get; set; } = null!; // Many-to-one relationship with Order
        public FishProfile FishProfile { get; set; } = null!; // One-to-one relationship with Fish
        public ICollection<HealthStatus> HealthStatus { get; set; } = null!; // Many-to-one relationship with HealthStatus
    }
}


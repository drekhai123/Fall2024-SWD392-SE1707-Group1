using System;
using System.ComponentModel.DataAnnotations;
using KDOS_Web_API.Models.Domains;

namespace KDOS_Web_API.Models.Domains
{
    public class OrderDetails
    {
        [Key]
        public int OrderDetailsId { get; set; }
        public int KoiFishId { get; set; }
        public int FishAge { get; set; }
        public float FishWeight { get; set; }
        // Relationships
        public int OrderId { get; set; } // Foreign key
        public Orders Order { get; set; } = null!; // Many-to-one relationship with Order
        public KoiFish? KoiFish { get; set; } // One-to-one relationship with Fish
        public ICollection<HealthStatus> HealthStatus { get; set; } = null!; // Many-to-one relationship with HealthStatus

    }
}


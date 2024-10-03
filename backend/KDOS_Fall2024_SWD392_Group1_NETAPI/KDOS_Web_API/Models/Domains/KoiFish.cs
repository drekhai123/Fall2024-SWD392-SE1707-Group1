using System;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models
{
    public class KoiFish
    {
        [Key]
        public int KoiFishId { get; set; }

        public string? FishType { get; set; }
        public string? HealthStatus { get; set; }
        public int OrderDetailsId { get; set; }// One-to-many relationship with OrderDetails
        public OrderDetails OrderDetails { get; set; } = null!; // REQUIRED relationship
    }
}


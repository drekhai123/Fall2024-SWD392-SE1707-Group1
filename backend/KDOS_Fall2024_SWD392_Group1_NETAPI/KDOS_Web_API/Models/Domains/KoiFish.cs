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

        // Navigation property for related order details
        public ICollection<OrderDetails> OrderDetails { get; set; } = new List<OrderDetails>(); // One-to-many relationship with OrderDetails
    }
}


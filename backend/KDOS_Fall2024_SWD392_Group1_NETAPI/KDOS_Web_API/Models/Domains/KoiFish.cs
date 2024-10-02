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

        // You can add a navigation property if needed
        public ICollection<OrderDetails> OrderDetails { get; set; } = new List<OrderDetails>(); // One-to-many relationship with OrderDetails
    }
}


using System;
using System.ComponentModel.DataAnnotations;
using KDOS_Web_API.Models.Domains;

namespace KDOS_Web_API.Models.Domains
{
    public class OrderDetails
    {
        [Key]
        public int OrderDetailsId { get; set; }

        public int Quantity { get; set; }
        public float Weight { get; set; }

        // Relationships
        public int OrderId { get; set; } // Foreign key
        public Orders Order { get; set; } = null!; // Many-to-one relationship with Order
        public ICollection<KoiFish> KoiFish { get; set; } = new List<KoiFish>(); // Many-to-one relationship with KoiFish
    }
}


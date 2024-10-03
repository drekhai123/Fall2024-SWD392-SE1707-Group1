using System;
using System.ComponentModel.DataAnnotations;
using KDOS_Web_API.Models.Domains;

namespace KDOS_Web_API.Models
{
    public class OrderDetails
    {
        [Key]
        public int OrderDetailsId { get; set; }

        public int Quantity { get; set; }
        public float Weight { get; set; }

        // Relationships
        public int OrderId { get; set; } // Foreign key
        public Orders Order { get; set; } // Many-to-one relationship with Order

        public int KoiFishId { get; set; } // Foreign key
        public KoiFish KoiFish { get; set; } // Many-to-one relationship with KoiFish
    }
}


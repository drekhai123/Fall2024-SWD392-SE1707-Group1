using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models.Domains
{
    public class Orders
    {
        [Key]
        public int OrderId { get; set; }

        public string? RecipientAddress { get; set; }
        public string? RecipientName { get; set; }
        public string? RecipientPhoneNumber { get; set; }
        public string? RecipientEmail { get; set; }
        public double TotalCost { get; set; }
        public int OrderStatus { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Relationships
        public int CustomerId { get; set; }
        public Customer Customer { get; set; } = null!; // REQUIRED Many-to-one relationship with Customer
        public ICollection<OrderDetails> OrderDetails { get; set; } = new List<OrderDetails>(); // One-to-many relationship with OrderDetails
        public int TransportId { get; set; } // Foreign key to transport. 1 transport can have Many Order
        public Transport? Transport { get; set; } // many-1 relationship with Tranport
    }
}

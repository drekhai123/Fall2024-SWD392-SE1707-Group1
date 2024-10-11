using KDOS_Web_API.Models.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models.Domains
{
    public class Orders
    {
        [Key]
        public int OrderId { get; set; }

        required public String SenderName { get; set; }
        required public String SenderAddress { get; set; }
        required public String SenderPhoneNumber { get; set; }
        required public String RecipientAddress { get; set; }
        required public String RecipientName { get; set; }
        required public String RecipientPhoneNumber { get; set; }
        required public String RecipientEmail { get; set; }
        required public PaymentMethod PaymentMethod { get; set; }
        required public PaymentStatus PaymentStatus { get; set; }
        required public OrderStatus DeliveryStatus { get; set; }
        required public string? DeliveryNote { get; set;}
        required public int Quantity { get; set; }
        required public double TotalWeight { get; set; }
        required public double TotalCost { get; set; }
        required public int OrderStatus { get; set; }
        required public DateTime CreatedAt { get; set; }
        required public DateTime UpdatedAt { get; set; }

        // Relationships
        required public int CustomerId { get; set; }
        public Customer Customer { get; set; } = null!; // REQUIRED Many-to-one relationship with Customer
        public ICollection<OrderDetails> OrderDetails { get; set; } = new List<OrderDetails>(); // One-to-many relationship with OrderDetails
        public int TransportId { get; set; } // Foreign key to transport. 1 transport can have Many Order
        public Transport? Transport { get; set; } // many-1 relationship with Tranport
    }
}

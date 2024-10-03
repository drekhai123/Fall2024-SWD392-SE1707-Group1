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

        public string? RecipientAddress { get; set; }
        public string? RecipientName { get; set; }
        public string? RecipientPhoneNumber { get; set; }
        public string? RecipientEmail { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public OrderStatus DeliveryStatus { get; set; }
        public string? DeliveryNote { get; set;}
        public int Quantity { get; set; }
        public double TotalWeight { get; set; }
        public double TotalCost { get; set; }
        public int OrderStatus { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Relationships
        public int CustomerId { get; set; }
        public Customer Customer { get; set; } // Many-to-one relationship with Customer
        public int SenderId { get; set; }
        public Customer Sender { get; set; }
        public List<OrderDetails> OrderDetails { get; set; } = new List<OrderDetails>(); // One-to-many relationship with OrderDetails
    }
}

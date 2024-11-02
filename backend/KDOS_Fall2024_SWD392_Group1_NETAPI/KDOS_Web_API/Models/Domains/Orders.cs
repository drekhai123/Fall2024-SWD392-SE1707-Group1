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

        required public string SenderName { get; set; }
        required public string SenderAddress { get; set; }
        required public string SenderPhoneNumber { get; set; }
        required public string RecipientAddress { get; set; }
        required public string RecipientName { get; set; }
        required public string RecipientPhoneNumber { get; set; }
        [EmailAddress]
        required public string RecipientEmail { get; set; }
        required public PaymentMethod PaymentMethod { get; set; }
        required public PaymentStatus PaymentStatus { get; set; }
        required public OrderStatus DeliveryStatus { get; set; }
        required public string DeliveryNote { get; set;}
        required public int Quantity { get; set; }
        required public double TotalWeight { get; set; }
        required public double Distance { get; set; }
        required public double TotalCost { get; set; }
        required public DateTime CreatedAt { get; set; }
        required public DateTime UpdatedAt { get; set; }
        public int DistancePriceListId { get; set; }
        public int WeightPriceListId { get; set; }
        required public int CustomerId { get; set; }
        public int TransportId { get; set; } // Foreign key to transport. 1 transport can have Many Order

        // Relationships
        public WeightPriceList WeightPriceList { get; set; } = null!;
        public DistancePriceList DistancePriceList { get; set; } = null!;
        public Customer Customer { get; set; } = null!; // REQUIRED Many-to-one relationship with Customer
        public Feedback Feedback { get; set; } = null!;
        public ICollection<OrderDetails> OrderDetails { get; set; } = new List<OrderDetails>(); // One-to-many relationship with OrderDetails
        public Transport? Transport { get; set; } // many-1 relationship with Tranport
    }
}

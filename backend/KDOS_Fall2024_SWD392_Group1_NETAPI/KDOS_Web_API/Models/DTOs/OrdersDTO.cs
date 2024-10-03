using KDOS_Web_API.Models.Enum;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models.DTOs
{
    public class OrdersDTO
    {
        public int OrderId { get; set; }

        [Required]
        public string RecipientAddress { get; set; }

        [Required]
        public string RecipientName { get; set; }

        [Required]
        public string RecipientPhoneNumber { get; set; }

        [EmailAddress]
        public string RecipientEmail { get; set; }

        [Required]
        public PaymentMethod PaymentMethod { get; set; }

        public PaymentStatus PaymentStatus { get; set; }
        public OrderStatus DeliveryStatus { get; set; }

        public string DeliveryNote { get; set; }

        [Required]
        public int Quantity { get; set; }

        public double TotalWeight { get; set; }
        public double TotalCost { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Keep only IDs for relationships
        public int CustomerId { get; set; }
        public int SenderId { get; set; }
    }
}
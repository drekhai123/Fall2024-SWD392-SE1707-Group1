using KDOS_Web_API.Models.Enum;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models.DTOs
{
    public class OrdersDTO
    {
        public int OrderId { get; set; }

        [Required]
        public required string SenderName { get; set; }
        [Required]
        public required string SenderAddress { get; set; }
        [Required]
        public required string SenderPhoneNumber { get; set; }

        [Required]
        public required string RecipientAddress { get; set; }

        [Required]
        public required string RecipientName { get; set; }

        [Required]
        public required string RecipientPhoneNumber { get; set; }

        [EmailAddress]
        public required string RecipientEmail { get; set; }

        [Required]
        public PaymentMethod PaymentMethod { get; set; }

        public PaymentStatus PaymentStatus { get; set; }
        public OrderStatus DeliveryStatus { get; set; }

        public required string DeliveryNote { get; set; }

        [Required]
        public int Quantity { get; set; }

        public double TotalWeight { get; set; }
        public double TotalCost { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int DistancePriceListId { get; set; }
        public int WeightPriceListId { get; set; }
        public int CustomerId { get; set; }
        public int TransportId { get; set; }

    }
}
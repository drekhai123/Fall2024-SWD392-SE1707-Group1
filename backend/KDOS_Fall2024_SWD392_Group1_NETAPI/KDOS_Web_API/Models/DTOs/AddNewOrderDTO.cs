using KDOS_Web_API.Models.Enum;

namespace KDOS_Web_API.Models.DTOs
{
    public class AddNewOrderDTO
    {
        public required string SenderName { get; set; }
        public required string SenderAddress { get; set; }
        public required string SenderPhoneNumber { get; set; }
        public required string RecipientAddress { get; set; }
        public required string RecipientName { get; set; }
        public required string RecipientPhoneNumber { get; set; }
        public required string RecipientEmail { get; set; }
        public required PaymentMethod PaymentMethod { get; set; }
        public required PaymentStatus PaymentStatus { get; set; }
        public required OrderStatus DeliveryStatus { get; set; }
        public required string DeliveryNote { get; set; }
        public required int Quantity { get; set; }
        public required double TotalWeight { get; set; }
        required public double Distance { get; set; }
        public required double TotalCost { get; set; }
        public required DateTime CreatedAt { get; set; }
        public required DateTime UpdatedAt { get; set; }
        public int DistancePriceListId { get; set; }
        public int WeightPriceListId { get; set; }
        public required int CustomerId { get; set; }
        public required int TransportId { get; set; }
    }
}

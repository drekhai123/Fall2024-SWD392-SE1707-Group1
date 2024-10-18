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
        public required double TotalCost { get; set; }
    }
}

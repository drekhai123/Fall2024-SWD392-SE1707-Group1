namespace KDOS_Web_API.Models.DTOs
{
    public class PaymentDTO
    {
        public int PaymentId { get; set; }
        public long OrderId { get; set; }
        public decimal Amount { get; set; }
        public DateTime CreatedDate { get; set; }
        public String TransactionId { get; set; }   // Transaction ID from the payment gateway
        public string Status { get; set; }
    }
}

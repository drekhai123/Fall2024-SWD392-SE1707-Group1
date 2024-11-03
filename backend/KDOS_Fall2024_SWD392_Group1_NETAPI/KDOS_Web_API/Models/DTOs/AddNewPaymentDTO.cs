namespace KDOS_Web_API.Models.DTOs
{
    public class AddNewPaymentDTO
    {
        public long OrderId { get; set; }
        public decimal Amount { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}

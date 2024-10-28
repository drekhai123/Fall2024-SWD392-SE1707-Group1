using KDOS_Web_API.Models.Enum;

namespace KDOS_Web_API.Models.Domains
{
    public class Payment
    {
        public int PaymentId { get; set; }
        public long Amount { get; set; }            // Amount to be paid (in VND)
        public string? PaymentDesc { get; set; }       // Description of the Payment
        public DateTime CreatedDate { get; set; }   // Date when the Payment was created
        public PaymentStatus Status { get; set; }          // Status of the Payment (e.g., Pending, Completed)
        public long TransactionId { get; set; }     // Transaction ID from the payment gateway
    }
}

using KDOS_Web_API.Models.Enum;

namespace KDOS_Web_API.Models.Domains
{
    public class Payment
    {
        public int PaymentId { get; set; }
        public String TransactionId { get; set; }   // Transaction ID from the payment gateway
        public int OrderId { get; set; }             // Order ID that the Payment is associated with
        public decimal Amount { get; set; }            // Amount to be paid (in VND)
        public DateTime CreatedDate { get; set; }   // Date when the Payment was created
        public PaymentStatus Status { get; set; }          // Status of the Payment (e.g., Pending, Completed)      
        public Orders Orders { get; set; }          // Navigation property to the associated Order
    }
}

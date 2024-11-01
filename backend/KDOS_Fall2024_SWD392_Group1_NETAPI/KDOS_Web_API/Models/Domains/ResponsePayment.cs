namespace KDOS_Web_API.Models.Domains
{
    public class ResponsePayment
    {
        public int paymentId { get; set; }
        public long ResponseId { get; set; }
        public long OrderId { get; set; }
        public bool Success { get; set; }
        public string VnpTransactionId { get; set; }
        public DateTime ResponseDate { get; set; }
        public string? StatusMessage { get; set; }    // Optional, provides details on the payment status

    }
}

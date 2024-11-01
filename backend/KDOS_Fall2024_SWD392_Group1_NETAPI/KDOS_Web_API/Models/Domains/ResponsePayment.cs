namespace KDOS_Web_API.Models.Domains
{
    public class ResponsePayment
    {
        public long ResponseId { get; set; }
        public long OrderId { get; set; }
        public string VnpTransactionId { get; set; }
        public string BankCode { get; set; }
        public string ResponseData { get; set; }
        public DateTime ResponseDate { get; set; }
    }
}

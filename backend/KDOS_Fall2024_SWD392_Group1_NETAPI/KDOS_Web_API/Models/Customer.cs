namespace KDOS_Web_API.Models
{
    public class Customer
    {
        public Guid CustomerId { get; set; }
        public required String CustomerName { get; set; }
        public required int Age { get; set; }
        public required String Email { get; set; }
        public required String[] Addresses { get; set; }
    }
}

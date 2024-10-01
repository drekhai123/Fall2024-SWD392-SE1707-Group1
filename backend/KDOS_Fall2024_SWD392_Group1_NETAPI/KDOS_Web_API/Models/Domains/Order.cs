namespace KDOS_Web_API.Models.Domains
{
    public class Order
    {
        public int OrderId { get; set; }
        public DateTime OrderDate { get; set; }
        public double TotalCost { get; set; }
        public int OrderStatus { get; set; }
        public String Location { get; set; }
        public Customer Customer { get; set; }
        public List<OrderDetails> OrderDetails { get; set; }
     

    }
}

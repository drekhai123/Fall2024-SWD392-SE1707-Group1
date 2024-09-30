using System;
namespace KDOS_Web_API.Models
{
	public class OrderDetails
	{
         public Guid OrderDetailsId { get; set; }
         public int Quantity { get; set; }
         public float Weight { get; set; }
         public double Price { get; set; }
        public ICollection<Order> Orders { get; set; } = new List<Order>();

    }
}


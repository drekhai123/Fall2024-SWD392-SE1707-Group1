using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models.Domains
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }         // Keep from both versions
        public DateTime OrderDate { get; set; } // Use CreatedDate from the second version
        public double TotalCost { get; set; }     // Keep from the first version
        public int OrderStatus { get; set; }      // Keep from the first version
        public String Location { get; set; }      // Keep from the first version
        public Customer Customer { get; set; }    // Keep from the first version
        public List<OrderDetails> OrderDetails { get; set; } // Keep from the first version
    }
}

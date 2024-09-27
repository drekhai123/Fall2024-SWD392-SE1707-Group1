using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KDOS.Data.Models
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

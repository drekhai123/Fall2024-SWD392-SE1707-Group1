using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models
{
    public class Customer
    {
        public Guid CustomerId { get; set; }
        [Required]
        public String CustomerName { get; set; }
        [Required]
        public int Age { get; set; }
        [Required]
        public String Email { get; set; }
        [Required]
        public String[] Addresses { get; set; }
    }
}

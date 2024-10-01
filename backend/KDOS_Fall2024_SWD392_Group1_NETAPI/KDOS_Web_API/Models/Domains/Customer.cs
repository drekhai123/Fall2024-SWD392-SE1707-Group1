using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KDOS_Web_API.Models
{
    public class Customer
    {
        [Key]
         public int CustomerId { get; set; } // PK
        public int AccountId { get; set; } //FK
        [Required]
        required public String CustomerName { get; set; }
        [Required]
        required public int Age { get; set; }
        [Required]
        required public String Gender { get; set; }
        [Required]
        required public String PhoneNumber { get; set; }
        [Required]
        required public String Address { get; set; }
  
        // Link between Account and Customer
         public Account? Account { get; set; }

    }
}

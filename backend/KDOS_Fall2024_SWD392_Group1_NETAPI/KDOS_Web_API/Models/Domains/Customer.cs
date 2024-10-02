<<<<<<< Updated upstream
﻿using System.ComponentModel.DataAnnotations;
=======
﻿using KDOS_Web_API.Models.Domains;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
>>>>>>> Stashed changes

namespace KDOS_Web_API.Models
{
    public class Customer
    {
        [Key]
<<<<<<< Updated upstream
        public int CustomerId { get; set; }

         public String? CustomerName { get; set; }
         public int Age { get; set; }
         public String? Gender { get; set; }
         public String? Email { get; set; }
         public String? PhoneNumber { get; set; }
        public  String? Address { get; set; }
=======
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
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
>>>>>>> Stashed changes

        // Link between Account and Customer
        public Account? Account { get; set; }
        public ICollection<Order> Orders { get; set; } = new List<Order>(); // One-to-many relationship with Order
    }
}

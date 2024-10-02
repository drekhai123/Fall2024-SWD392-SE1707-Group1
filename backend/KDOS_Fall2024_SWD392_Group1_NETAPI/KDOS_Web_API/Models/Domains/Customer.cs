using KDOS_Web_API.Models.Domains;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models
{
    public class Customer
    {
        [Key]
        public int CustomerId { get; set; } // PK

        public int AccountId { get; set; } // FK

        [Required]
        public string CustomerName { get; set; }

        [Required]
        public int Age { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public string Email { get; set; } // Include Email as it was in one version

        [Required]
        public string PhoneNumber { get; set; }

        [Required]
        public string Address { get; set; }
        public int OrderId { get; set; } // FK
        public DateTime CreatedAt { get; set; } // Include CreatedAt
        public DateTime UpdatedAt { get; set; } // Include UpdatedAt

        // Link between Account and Customer
        public Account? Account { get; set; }

        public ICollection<Orders> Orders { get; set; } = new List<Orders>(); // One-to-many relationship with Order
    }
}
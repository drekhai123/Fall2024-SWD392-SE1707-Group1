using KDOS_Web_API.Models.Domains;
using Microsoft.VisualStudio.Web.CodeGeneration.Utils;
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
        public required string  CustomerName { get; set; }

        [Required]
        public required int Age { get; set; }

        [Required]
        public required string Gender { get; set; }

        [Required]
        public required string PhoneNumber { get; set; }

        [Required]
        public required string Address { get; set; }
        public int OrderId { get; set; } // FK
        public DateTime CreatedAt { get; set; } // Include CreatedAt
        public DateTime UpdatedAt { get; set; } // Include UpdatedAt

        // Link between Account and Customer
        public Account? Account { get; set; }
        public ICollection<Orders> Orders { get; set; } = new List<Orders>(); // Navigation property
    }
}
using System;
using KDOS_Web_API.Models.Domains;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models.DTOs
{
	public class CustomerAccountDTO
	{
        [Key]
        public int CustomerId { get; set; } // PK

        [Required]
        public required string CustomerName { get; set; }

        [Required]
        public required int Age { get; set; }

        [Required]
        public required string Gender { get; set; }

        [Required]
        public required string PhoneNumber { get; set; }

        [Required]
        public required string Address { get; set; }
        public DateTime CreatedAt { get; set; } // Include CreatedAt
        public DateTime UpdatedAt { get; set; } // Include UpdatedAt
        // Link between Account and Customer
        public required AccountCustomerViewDTO Account { get; set; }
    }
}


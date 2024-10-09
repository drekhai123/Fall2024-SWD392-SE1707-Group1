using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KDOS_Web_API.Models.DTOs
{
	public class UpdateCustomerDTO
	{
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
        public DateTime CreatedAt { get; set; } // Include CreatedAt
        public DateTime UpdatedAt { get; set; } // Include UpdatedAt

    }
}


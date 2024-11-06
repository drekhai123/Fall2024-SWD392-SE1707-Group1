using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KDOS_Web_API.Models.DTOs
{
	public class AddNewCustomerDTO
	{
        [Required]
        required public string CustomerName { get; set; }
        [Required]
        required public DateOnly Dob { get; set; }
        [Required]
        required public int AccountId { get; set; }
        [Required]
        required public string Gender { get; set; }
        [Required]
        required public string PhoneNumber { get; set; }
        [Required]
        required public string Address { get; set; }

        public DateTime CreatedAt { get; set; } // Include CreatedAt
        public DateTime UpdatedAt { get; set; } // Include UpdatedAt

    }
}


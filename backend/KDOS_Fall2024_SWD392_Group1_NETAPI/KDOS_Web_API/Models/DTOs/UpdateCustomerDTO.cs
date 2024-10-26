using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KDOS_Web_API.Models.DTOs
{
	public class UpdateCustomerDTO
	{
        [Required]
        required public string CustomerName { get; set; }
        [Required]
        required public int Age { get; set; }
        [Required]
        required public string Gender { get; set; }
        [Required]
        required public string PhoneNumber { get; set; }
        [Required]
        required public string Address { get; set; }
        public DateTime UpdatedAt { get; set; } // Include UpdatedAt

    }
}


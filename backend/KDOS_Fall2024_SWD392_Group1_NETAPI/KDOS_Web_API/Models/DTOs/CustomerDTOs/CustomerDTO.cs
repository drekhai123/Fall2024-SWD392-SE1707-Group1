using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using KDOS_Web_API.Models.Domains;

namespace KDOS_Web_API.Models.DTOs
{
    public class CustomerDTO
    {
        [Key]
        public int CustomerId { get; set; }
        [Required]
        required public int AccountId { get; set; }
        [Required]
        required public string CustomerName { get; set; }
        [Required]
        required public DateOnly Dob { get; set; }
        [Required]
        required public string Gender { get; set; }
        [Required]
        required public string PhoneNumber { get; set; }
        [Required]
        required public string Address { get; set; }
        [Required]
        required public string Avatar { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; } // Include CreatedAt
        public DateTime UpdatedAt { get; set; } // Include UpdatedAt
    }

}


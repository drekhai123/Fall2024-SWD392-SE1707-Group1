using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KDOS_Web_API.Models.DTOs
{
    public class CustomerDTO
    {
        [Key]
        public int CustomerId { get; set; }
        [Required]
        required public int AccountId { get; set; }
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
    }
}


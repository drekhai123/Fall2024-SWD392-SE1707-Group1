using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using KDOS_Web_API.Models.Domains;

namespace KDOS_Web_API.Models.DTOs
{
	public class StaffDTO
	{
        [Key]
        public int StaffId { get; set; }
        [Required]
        required public int AccountId { get; set; }
        [Required]
        required public string StaffName { get; set; }
        [Required]
        required public DateOnly Dob { get; set; }
        [Required]
        required public string Gender { get; set; }
        [Required]
        required public string PhoneNumber { get; set; }
        public AccountCustomerViewDTO Account { get; set; } = null!;
    }
}


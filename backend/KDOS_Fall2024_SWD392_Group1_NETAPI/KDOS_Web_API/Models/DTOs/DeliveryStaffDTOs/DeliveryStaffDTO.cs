using System;
using KDOS_Web_API.Models.Domains;
using System.ComponentModel.DataAnnotations;
using KDOS_Web_API.Models.Enum;

namespace KDOS_Web_API.Models.DTOs
{
	public class DeliveryStaffDTO
	{
        [Key]
        public int StaffId { get; set; }
        public int AccountId { get; set; }
        [Required]
        public StaffStatus StaffStatus { get; set; }
        [Required]
        required public string StaffName { get; set; }
        [Required]
        required public DateOnly Dob { get; set; }
        [Required]
        required public string Gender { get; set; }
        [Required]
        required public string PhoneNumber { get; set; }
        [Required]
        public AccountCustomerViewDTO Account { get; set; } = null!;
    }   
}


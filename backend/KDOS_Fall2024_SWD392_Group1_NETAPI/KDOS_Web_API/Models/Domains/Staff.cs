using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using KDOS_Web_API.Models.Domains;
using KDOS_Web_API.Models.Enum;

namespace KDOS_Web_API.Models.Domains
{
	public class Staff
	{
        [Key]
        public int StaffId { get; set; }
        public int AccountId { get; set; }
        [Required]
        required public StaffStatus StaffStatus { get; set; }
        [Required]
        required public string StaffName { get; set; }
        [Required]
        required public DateOnly Dob { get; set; }
        [Required]
        required public string Gender { get; set; }
        [Required]
        required public string PhoneNumber { get; set; }
        // Link between Account and Staff
        [Required]
        public Account? Account { get; set; }
        public ICollection<Transport>? Transports { get; set; }
    }
}


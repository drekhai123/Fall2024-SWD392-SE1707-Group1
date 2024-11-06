using System;
using KDOS_Web_API.Models.Domains;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models.DTOs
{
    public class UpdateDeliveryStaffDTO
    {

        [Required]
        required public string StaffName { get; set; }
        [Required]
        required public DateOnly Dob { get; set; }
        [Required]
        required public string Gender { get; set; }
        [Required]
        required public string PhoneNumber { get; set; }
        // Link between Account and Staff
    }
}


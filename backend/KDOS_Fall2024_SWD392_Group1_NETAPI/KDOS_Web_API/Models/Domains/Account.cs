using System;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models.Domains
{
	public class Account
	{
        [Key]
        public int AccountId { get; set; }
        required public bool Banned { get; set; }
        required public string Email { get; set; }
        required public string UserName { get; set; }
        required public string Password { get; set; }
        required public string Role { get; set; }
        public string? Avatar { get; set; }
        public bool Verified { get; set; }
        public Verification? Verification { get; set; }
        public Customer? Customer { get; set; }
        public Staff? Staff { get; set; }
        public DeliveryStaff? DeliveryStaff { get; set; }
        public HealthCareStaff? HealthCareStaff { get; set; }
    }
}

using System;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models.Domains
{
	public class Account
	{
        [Key]
        public int AccountId { get; set; }
        required public bool Banned { get; set; }
        required public String Email { get; set; }
        required public String UserName { get; set; }
        required public String Password { get; set; }
        required public String Role { get; set; }
        public Customer? Customer { get; set; }
        public Staff? Staff { get; set; }
        public DeliveryStaff? DeliveryStaff { get; set; }
    }
}

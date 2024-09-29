using System;
namespace KDOS_Web_API.Models
{
	public class Account
	{
        public Guid AccountId { get; set; }
        public String? Email { get; set; }
        public String? UserName { get; set; }
        public String? Password { get; set; }
        public String? Role { get; set; }
    }
}


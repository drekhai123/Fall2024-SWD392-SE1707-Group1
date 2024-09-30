using System;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models
{
	public class Account
	{
        [Key]
        public int AccountId { get; set; }

        public String? Email { get; set; }
        public String? UserName { get; set; }
        public String? Password { get; set; }
        public String? Role { get; set; }
    }
}

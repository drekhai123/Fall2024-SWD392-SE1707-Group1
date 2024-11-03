using System;
using System.ComponentModel.DataAnnotations;
using KDOS_Web_API.Models.Domains;

namespace KDOS_Web_API.Models.DTOs
{
	public class AccountDTO
	{
        [Key]
        public int AccountId { get; set; }
        required public bool Banned { get; set; }
        required public string Email { get; set; }
        required public string UserName { get; set; }
        required public string Password { get; set; }
        required public string Role { get; set; }
        public string? Avatar { get; set; }
        required public bool Verified { get; set; }
        public CustomerDTO? Customer { get; set; }
    }
}


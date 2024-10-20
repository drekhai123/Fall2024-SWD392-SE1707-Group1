using System;
namespace KDOS_Web_API.Models.DTOs
{
	public class LoginDTO
	{
        public required string UserNameOrEmail { get; set; }
        public required string Password { get; set; }
	}
}


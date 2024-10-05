using System;
namespace KDOS_Web_API.Models.DTOs
{
	public class LoginDTO
	{
        public required String UserNameOrEmail { get; set; }
        public required String Password { get; set; }
	}
}


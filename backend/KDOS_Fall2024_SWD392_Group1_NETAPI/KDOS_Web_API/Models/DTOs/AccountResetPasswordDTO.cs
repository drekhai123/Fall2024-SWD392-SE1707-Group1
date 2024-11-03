using System;
namespace KDOS_Web_API.Models.DTOs
{
	public class AccountResetPasswordDTO
	{
        required public string Email { get; set; }
        required public string Password { get; set; }
    }
}


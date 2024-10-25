using System;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models.DTOs
{
	public class UpdateAccountDTO
	{
        required public bool Banned { get; set; }
        [MaxLength(100, ErrorMessage = "Email Address is too long")]
        [MinLength(5, ErrorMessage = "Email Address is too short")]
        required public string Email { get; set; }
        [MaxLength(50, ErrorMessage = "Username is too long")]
        [MinLength(5, ErrorMessage = "Username is too short")]
        required public string Password { get; set; }
        required public string Role { get; set; }
    }
}


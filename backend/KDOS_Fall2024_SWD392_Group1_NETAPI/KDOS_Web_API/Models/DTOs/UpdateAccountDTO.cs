using System;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models.DTOs
{
	public class UpdateAccountDTO
	{
        [MaxLength(100, ErrorMessage = "Email Address is too long")]
        [MinLength(5, ErrorMessage = "Email Address is too short")]
        required public string Email { get; set; }
        [MaxLength(50, ErrorMessage = "Username is too long")]
        [MinLength(5, ErrorMessage = "Username is too short")]
        required public string UserName { get; set; }
        required public string Avatar { get; set; }


    }
}


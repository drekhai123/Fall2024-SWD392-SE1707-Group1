using System;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models.DTOs
{
	public class AddNewAccountDTO
	{
        required public bool Banned { get; set; }
        required public string Email { get; set; }
        required public string UserName { get; set; }
        required public string Password { get; set; }
        required public string Role { get; set; }
    }
}


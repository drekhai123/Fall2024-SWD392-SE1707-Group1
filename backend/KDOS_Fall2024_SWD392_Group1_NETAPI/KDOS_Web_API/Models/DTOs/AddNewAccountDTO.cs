using System;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models.DTOs
{
	public class AddNewAccountDTO
	{
        required public bool Banned { get; set; }
        required public String Email { get; set; }
        required public String UserName { get; set; }
        required public String Password { get; set; }
        required public String Role { get; set; }
    }
}


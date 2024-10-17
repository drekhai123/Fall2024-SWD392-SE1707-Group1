using System;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models.DTOs
{
	public class UpdateAccountDTO
	{
         public String? Email { get; set; }
         public String? UserName { get; set; }
    }
}


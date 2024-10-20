using System;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models.DTOs
{
	public class BanAccountDTO
	{
        required public bool Banned { get; set; } = false;
    }
}


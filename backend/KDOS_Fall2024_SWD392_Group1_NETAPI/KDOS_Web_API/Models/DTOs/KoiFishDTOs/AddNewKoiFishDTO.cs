using System;
using KDOS_Web_API.Models.Domains;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models.DTOs
{
	public class AddNewKoiFishDTO
	{
        required public string FishType { get; set; }
        required public string Description { get; set; }
    }
}


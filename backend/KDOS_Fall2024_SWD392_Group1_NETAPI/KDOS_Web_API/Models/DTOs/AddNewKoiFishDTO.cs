using System;
using KDOS_Web_API.Models.Domains;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models.DTOs
{
	public class AddNewKoiFishDTO
	{
        required public String FishType { get; set; }
        required public String Description { get; set; }
    }
}


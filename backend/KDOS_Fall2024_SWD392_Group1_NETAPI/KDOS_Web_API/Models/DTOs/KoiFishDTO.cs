using System;
using KDOS_Web_API.Models.Domains;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models.DTOs
{
	public class KoiFishDTO
	{
        [Key]
        public int KoiFishId { get; set; }
        required public String FishType { get; set; }
        required public String Description { get; set; }
    }
}


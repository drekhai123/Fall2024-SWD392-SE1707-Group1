using System;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models.Domains
{
	public class AdditionalPrice
	{
        [Key]
        public int AdditionalPriceId { get; set; }
        required public string Description { get; set; }
        required public float Price { get; set; } 
        required public ICollection<Orders> Orders { get; set; } = null!;
    }
}


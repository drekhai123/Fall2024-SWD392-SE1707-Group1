using System;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models.Domains
{
	public class DistancePriceList
	{
        [Key]
        public int DistancePriceListId { get; set; }
        required public float MinRange { get; set; }
        required public float MaxRange { get; set; }
        required public float Price { get; set; }
        required public ICollection<Orders> Orders { get; set; } = null!;
    }
}


using System;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models
{
	public class KoiFish
	{
        [Key]
        public int KoiFishId { get; set; }

		 public String? FishType { get; set; }
         public String? Description { get; set; }
		public String? HealthStatus { get; set; }
	}
}


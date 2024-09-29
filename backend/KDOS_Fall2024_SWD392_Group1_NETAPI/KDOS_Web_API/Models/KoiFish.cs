using System;
namespace KDOS_Web_API.Models
{
	public class KoiFish
	{
		public Guid KoiFishId { get; set; }
		 public String? FishType { get; set; }
         public String? Description { get; set; }
		public String? HealthStatus { get; set; }
	}
}


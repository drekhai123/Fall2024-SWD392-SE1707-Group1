using System;
using System.ComponentModel.DataAnnotations;

namespace KDOS_Web_API.Models.Domains
{
	public class Order
	{
		[Key]
		public int OrderId { get; set; }
		public DateTime CreatedDate { get; set; }
	}
}


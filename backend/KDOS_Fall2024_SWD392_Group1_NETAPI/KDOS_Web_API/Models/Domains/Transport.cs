using System;
using System.ComponentModel.DataAnnotations;
using KDOS_Web_API.Models.Domains;

namespace KDOS_Web_API.Models.Domains
{
	public class Transport
	{
		[Key]
		public int TransportId { get; set; }
		[Required]
		public string? location { get; set; }
        [Required]
        public string? status { get; set; }
        public int DeliveryStaffId { get; set; } // FK to DeliveryStaff table
		public DeliveryStaff? DeliveryStaff { get; set; } // 1-1 relation
        public ICollection<Orders>? Orders { get; set; }// 1-Many relation with Order
    }
}


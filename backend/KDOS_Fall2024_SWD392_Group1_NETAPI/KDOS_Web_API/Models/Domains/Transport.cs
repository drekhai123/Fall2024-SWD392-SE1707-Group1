using System;
using System.ComponentModel.DataAnnotations;
using KDOS_Web_API.Models.Domains;
using KDOS_Web_API.Models.DTOs;
using KDOS_Web_API.Models.Enum;

namespace KDOS_Web_API.Models.Domains
{
	public class Transport
	{
		[Key]
		public int TransportId { get; set; }
        public TransportStatus Status { get; set; }
        public int StaffId { get; set; } // FK to Staff table
        public int HealthCareStaffId { get; set; } // FK to Healthcare table that check Fish Health
        public int DeliveryStaffId { get; set; } // FK to DeliveryStaff table
        public DeliveryStaff? DeliveryStaff { get; set; } // 1-1 relation
        public Staff? Staff { get; set; } // 1-1 relation
        public HealthCareStaff? HealthCareStaff { get; set; } // 1-1 relation
        public ICollection<Orders> Orders { get; set; } = null!;// 1-Many relation with Order
        public ICollection<LogTransport>? LogTransports { get; set; } // 1-Many relation with LogTransport
    }
}


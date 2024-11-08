using KDOS_Web_API.Models.Domains;
using KDOS_Web_API.Models.DTOs.HealthCareStaffDTOs;
using KDOS_Web_API.Models.DTOs.OrderDTOs;
using KDOS_Web_API.Models.Enum;

namespace KDOS_Web_API.Models.DTOs
{
    public class TransportDTO
    {
        public int TransportId { get; set; }
        public TransportStatus Status { get; set; }
        public int StaffId { get; set; } // FK to Staff table
        public int HealthCareStaffId { get; set; } // FK to Staff table that check Fish Health
        public int DeliveryStaffId { get; set; } // FK to DeliveryStaff table
        public DeliveryStaffDTO? DeliveryStaff { get; set; } // 1-1 relation
        public StaffDTO? Staff { get; set; } 
        public HealthCareStaffDTO? HealthCareStaff { get; set; } // 1-1 relation
        public ICollection<OrderDTOWithDetail>? Orders { get; set; }
    }
}

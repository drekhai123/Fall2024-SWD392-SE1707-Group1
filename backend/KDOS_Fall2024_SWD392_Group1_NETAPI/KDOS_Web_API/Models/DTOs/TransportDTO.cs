using KDOS_Web_API.Models.Enum;

namespace KDOS_Web_API.Models.DTOs
{
    public class TransportDTO
    {
        public TransportStatus Status { get; set; }
        public int StaffId { get; set; } // FK to Staff table
        public int HealthCareStaffId { get; set; } // FK to Staff table that check Fish Health
        public int DeliveryStaffId { get; set; } // FK to DeliveryStaff table
    }
}

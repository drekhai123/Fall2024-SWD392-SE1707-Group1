using KDOS_Web_API.Models.Enum;

namespace KDOS_Web_API.Models.DTOs
{
    public class AddNewTransportDTO
    {
        public TransportStatus Status { get; set; }
        public int DeliveryStaffId { get; set; }
        public int HealthCareStaffId { get; set; }
        public int StaffId { get; set; } 
    }
}

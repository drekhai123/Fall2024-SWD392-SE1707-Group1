using KDOS_Web_API.Models.Enum;

namespace KDOS_Web_API.Models.DTOs
{
    public class UpdateTransportDTO
    {
        public TransportStatus status { get; set; }
        public int DeliveryStaffId { get; set; }    
        public DeliveryStaffDTO? DeliveryStaff { get; set; }        

    }
}

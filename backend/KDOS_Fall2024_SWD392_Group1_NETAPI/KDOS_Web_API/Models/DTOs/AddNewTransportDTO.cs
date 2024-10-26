using KDOS_Web_API.Models.Enum;

namespace KDOS_Web_API.Models.DTOs
{
    public class AddNewTransportDTO
    {
        public TransportStatus status { get; set; }
        public int DeliveryStaffId { get; set; }
    }
}

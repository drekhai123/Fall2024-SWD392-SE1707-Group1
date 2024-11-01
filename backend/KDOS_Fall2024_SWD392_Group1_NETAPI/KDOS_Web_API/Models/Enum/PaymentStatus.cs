using System.Runtime.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace KDOS_Web_API.Models.Enum
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum PaymentStatus
    {
        [EnumMember(Value = "PENDING")] //Cho xu ly
        PENDING,

        [EnumMember(Value = "PAID")] //Da thanh toan
        PAID,

        [EnumMember(Value = "FAILED")] //Thanh toan that bai
        FAILED
    }
}

using System.Runtime.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace KDOS_Web_API.Models.Enum
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum PaymentStatus
    {
        [EnumMember(Value = "PENDING")]
        PENDING,

        [EnumMember(Value = "PAID")]
        PAID,

        [EnumMember(Value = "FAILED")]
        FAILED
    }
}

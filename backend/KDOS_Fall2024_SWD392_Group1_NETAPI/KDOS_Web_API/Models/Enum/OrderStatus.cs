using System.Runtime.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters; 

namespace KDOS_Web_API.Models.Enum
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum OrderStatus
    {
        [EnumMember(Value = "PENDING")]
        PENDING,

        [EnumMember(Value = "PROCESSING")]
        PROCESSING,

        [EnumMember(Value = "DELIVERED")]
        DELIVERED,

        [EnumMember(Value = "COMPLETED")]
        COMPLETED,

        [EnumMember(Value = "CANCELLED")]
        CANCELLED
    }
}

using System.Runtime.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace KDOS_Web_API.Models.Enum
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum TransportStatus
    {
        [EnumMember(Value = "FREE")] //Dang delivery
        FREE,

        [EnumMember(Value = "DELIVERING")] //Da giao hang
        DELIVERING,
    }
}

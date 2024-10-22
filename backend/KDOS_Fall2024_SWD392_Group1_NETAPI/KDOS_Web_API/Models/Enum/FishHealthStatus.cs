using System.Runtime.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace KDOS_Web_API.Models.Enum
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum FishHealthStatus
	{
        [EnumMember(Value = "HEALTHY")]
        HEALTHY,
        [EnumMember(Value = "UNHEALTHY")]
        UNHEALTHY,
        [EnumMember(Value = "SICK")]
        SICK,
        [EnumMember(Value = "DECEASED")]
        DECEASED
    }
   
}


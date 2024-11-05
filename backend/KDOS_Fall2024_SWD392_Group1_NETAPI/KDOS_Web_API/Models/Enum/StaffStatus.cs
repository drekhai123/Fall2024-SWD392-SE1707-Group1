using System.Runtime.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace KDOS_Web_API.Models.Enum
{
      [JsonConverter(typeof(StringEnumConverter))]
    public enum StaffStatus
    {
        [EnumMember(Value = "FREE")] // Free
        FREE,
        [EnumMember(Value = "OCCUPIED")] // Occupied
        OCCUPIED,
    }
}


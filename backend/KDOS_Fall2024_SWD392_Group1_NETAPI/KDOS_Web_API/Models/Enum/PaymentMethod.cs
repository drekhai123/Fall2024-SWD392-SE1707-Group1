using System.Runtime.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace KDOS_Web_API.Models.Enum
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum PaymentMethod
    {
        [EnumMember(Value = "CASH")]
        CASH,

        [EnumMember(Value = "BANK_TRANSFER")]
        BANK_TRANSFER
    }
}

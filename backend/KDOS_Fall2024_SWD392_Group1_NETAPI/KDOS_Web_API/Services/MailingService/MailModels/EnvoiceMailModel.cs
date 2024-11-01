using System;
using Newtonsoft.Json;

namespace KDOS_Web_API.Services.MailingService.MailModels
{
	public class EnvoiceMailModel
    {
        [JsonProperty("createdAt")]
        required public DateOnly CreatedAt { get; set; }
        [JsonProperty("senderName")]
        required public string SenderName { get; set; }
        [JsonProperty("recipientEmail")]
        required public string RecipientEmail { get; set; }
        [JsonProperty("recipientName")]
        required public string RecipientName { get; set; }
        [JsonProperty("orderId")]
        required public int OrderId { get; set; }
        [JsonProperty("distance")]
        required public float Distance { get; set; }
        [JsonProperty("totalWeight")]
        required public float TotalWeight { get; set; }
        [JsonProperty("distancePrice")]
        required public float DistancePrice { get; set; }
        [JsonProperty("weightPrice")]
        required public float WeightPrice { get; set; }
        [JsonProperty("totalCost")]
        required public float TotalCost { get; set; }
	}
}


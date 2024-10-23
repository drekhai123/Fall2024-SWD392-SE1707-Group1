using System;
using Newtonsoft.Json;

namespace KDOS_Web_API.Services.MailingService.MailModels
{
	public class VerificationMailModel
	{
        [JsonProperty("userName")] // convert to JSON format
        required public string UserName { get; set; }
        [JsonProperty("verificationLink")]
        required public string VerificationLink { get; set; }

    }
}


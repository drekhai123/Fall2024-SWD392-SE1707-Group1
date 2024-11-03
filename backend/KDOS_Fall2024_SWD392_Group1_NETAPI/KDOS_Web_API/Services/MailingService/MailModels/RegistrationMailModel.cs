
using Newtonsoft.Json;

namespace KDOS_Web_API.Services.MailingService.MailModels
{
	public class RegistrationMailModel
	{
        [JsonProperty("email")]
        required public string Email { get; set; }
        [JsonProperty("username")]
        required public string Username { get; set; }
    }
}


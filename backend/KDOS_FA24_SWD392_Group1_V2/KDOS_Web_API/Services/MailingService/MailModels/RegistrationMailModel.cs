
using Newtonsoft.Json;

namespace KDOS_Web_API.Services.MailingService.MailModels
{
	public class RegistrationMailModel
	{
        [JsonProperty("email")]
        required public String Email { get; set; }
        [JsonProperty("username")]
        required public String Username { get; set; }
    }
}


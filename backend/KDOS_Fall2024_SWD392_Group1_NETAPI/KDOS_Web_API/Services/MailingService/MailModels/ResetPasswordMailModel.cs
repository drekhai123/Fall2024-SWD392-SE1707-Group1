using System;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using Newtonsoft.Json;

namespace KDOS_Web_API.Services.MailingService.MailModels
{
	public class ResetPasswordMailModel
	{
        [JsonProperty("email")] // convert to JSON format
        required public string Email { get; set; }
        [JsonProperty("passwordResetLink")]
        required public string PasswordResetLink { get; set; }
	}
}


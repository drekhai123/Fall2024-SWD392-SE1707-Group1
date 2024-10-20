using System;
using SendGrid.Helpers.Mail;

namespace KDOS_Web_API.Services.MailingService.MailModels
{
	public class MailModel
	{
        required public String TemplateId { get; set; }
        required public EmailAddress From { get; set; }
        required public EmailAddress To { get; set; }
    }
}


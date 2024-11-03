using System;
using KDOS_Web_API.Models.Domains;
using SendGrid;

namespace KDOS_Web_API.Services.MailingService
{
	public interface IMailingService
	{
		Task<Response> SendRegisterMail(Account account);
        Task<Response> SendVerificationLink(Account account, string verificationUrl);
        Task<Response> SendOrderConfirmation(Account account, Orders orders);
        Task<Response> SendEnvoiceMail(Account account,Orders orders);
        //TODOink
        Task<Response> SendResetPassword(Account account, string resetLink);
        
    }
}


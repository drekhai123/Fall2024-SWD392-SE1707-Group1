using System;
using KDOS_Web_API.Models.Domains;

namespace KDOS_Web_API.Services.MailingService
{
	public interface IMailingService
	{
		Task SendRegisterMail(Account account);
        Task SendOrderConfirmation(Account account, Orders orders);
        Task SendEnvoiceMail(Account account,Orders orders);
        //TODO
        Task SendResetPassword(Account account);
    }
}


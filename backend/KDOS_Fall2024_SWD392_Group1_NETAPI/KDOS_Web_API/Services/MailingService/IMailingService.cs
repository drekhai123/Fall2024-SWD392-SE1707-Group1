using System;
using KDOS_Web_API.Models.Domains;

namespace KDOS_Web_API.Services.MailingService
{
	public interface IMailingService
	{
		Task RegisterMail(Account account);
        Task OrderConfirmation(Account account, Orders orders);
        Task EnvoiceMail(Account account,Orders orders);
        //TODO
        Task ResetPassword(Account account);
    }
}


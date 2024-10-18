using System;
using KDOS_Web_API.Models.Domains;

namespace KDOS_Web_API.Services.MailingService
{
    public class MailingService : IMailingService
    {
       public async Task EnvoiceMail(Account account, Orders orders)
        {
            throw new NotImplementedException();
        }

        public async Task OrderConfirmation(Account account, Orders orders)
        {
            throw new NotImplementedException();
        }

        public async Task RegisterMail(Account account)
        {
            throw new NotImplementedException();
        }

        public async Task ResetPassword(Account account)
        {
            throw new NotImplementedException();
        }
    }


}


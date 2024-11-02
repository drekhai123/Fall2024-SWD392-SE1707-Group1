using System;
using KDOS_Web_API.Models.Domains;
using KDOS_Web_API.Services.MailingService.MailModels;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace KDOS_Web_API.Services.MailingService
{
    public class MailingService : IMailingService
    {
        // KDOS business mail (NOT REAL BUSINESS MAIL, DON'T SPAM!!!)
        readonly EmailAddress fromEmail = new EmailAddress("numberous1141@gmail.com", "KDOS");
        // Get authentication code from Environment Variables
        readonly String? apiKey = Environment.GetEnvironmentVariable("kdosmailingsystem");
        
        public async Task SendEnvoiceMail(Account account, Orders orders)
        {
            throw new NotImplementedException();
        }

        public async Task SendOrderConfirmation(Account account, Orders orders)
        {
            throw new NotImplementedException();
        }

        public async Task<Response> SendRegisterMail(Account account)
        {
            var mailModel = new MailModel
            {
                From = fromEmail,
                To = new EmailAddress(account.Email, account.UserName),
                TemplateId = "d-ee2bc42540a141d7b5f3dd3da6696fb5" // Registration template Id
            };
            var msg = new SendGridMessage();
            msg.SetFrom(mailModel.From);
            msg.AddTo(mailModel.To);
            msg.SetTemplateId(mailModel.TemplateId);
            var dynamicTemplateData = new RegistrationMailModel
            {
                Email = account.Email,
                Username = account.UserName,
            };
            msg.SetTemplateData(dynamicTemplateData);
            // Confirm code with SendGrid service - return the SendGrid client
            var client = new SendGridClient(apiKey);
            var response = await client.SendEmailAsync(msg);
            return response;
        }

        public async Task<Response> SendVerificationLink(Account account, string verificationUrl)
        {
            var mailModel = new MailModel
            {
                From = fromEmail,
                To = new EmailAddress(account.Email, account.UserName),
                TemplateId = "d-6192c1af361d4efc8411e3d8d2083110" // Verification template Id
            };
            var msg = new SendGridMessage();
            msg.SetFrom(mailModel.From);
            msg.AddTo(mailModel.To);
            msg.SetTemplateId(mailModel.TemplateId);
            var dynamicTemplateData = new VerificationMailModel
            {
                UserName = account.UserName,
                VerificationLink = verificationUrl
            };
            msg.SetTemplateData(dynamicTemplateData);
            // Confirm code with SendGrid service - return the SendGrid client
            var client = new SendGridClient(apiKey);
            var response = await client.SendEmailAsync(msg);
            return response;
        }
        public async Task<Response> SendResetPassword(Account account, string resetLink)
        {
            //var mailModel = new MailModel
            //{
            //    From = fromEmail,
            //    To = new EmailAddress(account.Email, account.UserName),
            //    TemplateId = "d-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" // Replace with your actual reset password template Id
            //};

            //var msg = new SendGridMessage();
            //msg.SetFrom(mailModel.From);
            //msg.AddTo(mailModel.To);
            //msg.SetTemplateId(mailModel.TemplateId);

            //var dynamicTemplateData = new ResetPasswordMailModel
            //{
            //    UserName = account.UserName,
            //    ResetLink = resetLink
            //};

            //msg.SetTemplateData(dynamicTemplateData);

            //// Confirm code with SendGrid service - return the SendGrid client
            //var client = new SendGridClient(apiKey);
            //var response = await client.SendEmailAsync(msg);
            //return response;
            throw new NotImplementedException();
        }

        private async Task SendMail()
        {
            var apiKey = Environment.GetEnvironmentVariable("kdosmailingsystem");
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("numberous1141@gmail.com", "KDOS");
            var to = new EmailAddress("blazehendrix007@gmail.com", "Blaze");
            var msg = new SendGridMessage();
            msg.SetFrom(from);
            msg.AddTo(to);
            msg.SetTemplateId("d-ee2bc42540a141d7b5f3dd3da6696fb5");
            var dynamicTemplateData = 0;
            msg.SetTemplateData(dynamicTemplateData);
            var response = await client.SendEmailAsync(msg);
            Console.WriteLine(response.StatusCode);
            Console.WriteLine(response.Headers.ToString());
        }

    }


}


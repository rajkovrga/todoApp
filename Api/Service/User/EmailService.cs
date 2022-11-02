using Microsoft.Extensions.Configuration;
using ServiceContract.User;
using System.Net;
using System.Net.Mail;

namespace Service.User
{
    public class EmailService : IEmailService
    {
        private IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task Send(IEnumerable<string> to, string subject, string body, IEnumerable<string>? bcc = null,bool isHtml = false, IEnumerable<Attachment>? attachments = null)
        {
            if (!to.Any())
                throw new ArgumentNullException(nameof(to));

            if (string.IsNullOrEmpty(_configuration["Smtp:From"]))
                throw new ArgumentNullException(_configuration["Smtp:Email"]);

            if (!MailAddress.TryCreate(_configuration["Smtp:From"], "",  out var mailAddress))
                throw new ArgumentNullException(nameof(mailAddress));


            var mailMessage = new MailMessage
            {
                Subject = subject,
                From = mailAddress!
            };

            var adresses = to.Where(x => x is not null);

            foreach (var item in adresses)
            {
                mailMessage.To.Add(item);
            }

            if(attachments is not null && attachments.Any())
            {
                var attachmentItems = attachments.Where(x => x is not null);

                foreach (var item in attachmentItems)
                {
                    mailMessage.Attachments.Add(item);
                }
            }

            if (bcc is not null && bcc.Any())
            {
                var bccItems = bcc.Where(x => x is not null);

                foreach (var item in bccItems)
                {
                    mailMessage.Bcc.Add(item);
                }
            }

            mailMessage.Body = body;
            mailMessage.IsBodyHtml = isHtml;

            await SendEmail(mailMessage);
        }


        private async Task SendEmail(MailMessage mailMessage)
        {
            var smtpClient = new SmtpClient(_configuration["Smtp:Server"], Convert.ToInt32(_configuration["Smtp:Port"])){
                Credentials = new NetworkCredential(_configuration["Smtp:Username"], _configuration["Smtp:Password"]),
                EnableSsl = true
            };
            await smtpClient.SendMailAsync(mailMessage);

            smtpClient.Dispose();
            mailMessage.Dispose();
        }
    }
}

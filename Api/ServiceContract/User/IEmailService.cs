using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace ServiceContract.User
{
    public interface IEmailService
    {
        public Task Send(IEnumerable<string> to, string subject, string body, IEnumerable<string>? bcc = null, bool isHtml = false, IEnumerable<Attachment>? attachments = null);
    }
}

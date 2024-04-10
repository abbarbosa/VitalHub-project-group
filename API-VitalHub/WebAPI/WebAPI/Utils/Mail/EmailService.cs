
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using System.Runtime.Serialization;

namespace WebAPI.Utils.Mail
{
    public class EmailService : IEmailService
    {
        //variavel com as configs do email
        private readonly EmailSettings emailSettings;

        public EmailService(IOptions<EmailSettings> options)
        {
            //obtendo as configs do email e armazena na variavel privada
            emailSettings = options.Value;
        }

        public async Task SendEmailAsync(MailRequest mailRequest)
        {
            try
            {
                //objeto que representa o email
                var email = new MimeMessage();

                //define o remetente do email
                email.Sender = MailboxAddress.Parse(emailSettings.Email);

                //adiciona o destinatario do email
                email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));

                //define o assunto do email
                email.Subject = mailRequest.Subject;

                //cria o corpo do email
                var Builder = new BodyBuilder();

                //define o corpo do email como html
                Builder.HtmlBody = mailRequest.Body;

                //define o corpo do email no objeto MimeMessage
                email.Body = Builder.ToMessageBody();

                using(var smtp = new SmtpClient())
                {
                    //conecta-se ao servidor SMTP usando os dados do emailsettings
                    smtp.Connect(emailSettings.Host, emailSettings.Port, MailKit.Security.SecureSocketOptions.StartTls);

                    //autentica-se no servidor SMTP usando os dados do emailSettings
                    smtp.Authenticate(emailSettings.Email, emailSettings.Password);

                    //envia o email assincrono
                    await smtp.SendAsync(email);
                }
            }
            catch(Exception)
            {
                throw;
            }
        }
    }
}

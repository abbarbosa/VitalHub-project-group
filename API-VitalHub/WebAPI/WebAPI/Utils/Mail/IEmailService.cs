namespace WebAPI.Utils.Mail
{
    public interface IEmailService
    {
        //metodo assincrono para envio de email que recebe mailrequest
        Task SendEmailAsync(MailRequest mailRequest);
    }
}

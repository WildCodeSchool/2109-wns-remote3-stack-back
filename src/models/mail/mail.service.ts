import transporter from '@environments/mail/transporter';
import { log } from '@utils/logger/logger';
import { ApolloError } from 'apollo-server-errors';

export default function MailService() {
  function sendConfirmationEmail(email: string, confirmationUrl: string) {
    const message = {
      from: 'noreply@stack.com',
      to: email,
      subject: 'Confirmez votre compte',
      html: (`
      <p>Bonjour,</p>
      <p>Pour finaliser votre inscription sur Stack, merci de cliquer sur le lien ci-dessous :<br>
      <a href="${confirmationUrl}">Confirmer mon compte</a><br>
      Si vous n'êtes pas à l'origine de cette action, ignorez simplement cet e-mail.<br>
      Pour toute demande, contactez nous à cette adresse : contact@stack.com.<br><br>
      Nous vous remercions pour votre confiance.<br><br>
      L'équipe Stack</p><br><br>
      <img style="width: 150px;" src="https://i.imgur.com/Cex12bM.png" />
      `),
    };

    transporter.sendMail(message, (error) => {
      if (error) {
        log.error(error);
        throw new ApolloError(`${error}`);
      }
    });
  }

  return {
    sendConfirmationEmail,
  };
}

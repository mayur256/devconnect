// Nodemailer lib
import nodemailer from 'nodemailer';
// Utils
import { MAIL_FROM, MAIL_HOST, MAIL_PASS, MAIL_USER } from '../utils/constant';
// Types
import { IMailBody } from '../types/Common';

/**
 * Class module to configure and send email
 */

class Mail {
    private mailTransport;

    constructor() {
        this.mailTransport = nodemailer.createTransport({
            host: MAIL_HOST,
            port: 2525,
            auth: {
                user: MAIL_USER,
                pass: MAIL_PASS
            },
            secure: false
        });
    }

    sendEmail = async ({
        to,
        mailBodyKeys
    }: { to: string, mailBodyKeys?: Partial<IMailBody> }): Promise<boolean> => {
        const message = {
            from: MAIL_FROM,
            to,
            subject: mailBodyKeys?.subject ?? 'Welcome',
            html: mailBodyKeys?.body ?? '<h1>Welcome</h1>'
        };

        const result = await this.mailTransport.sendMail(message);

        // if message is sent we have a corressponding messageId is generated
        return !!result?.messageId;
    };
};

export default new Mail();

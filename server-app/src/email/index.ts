// Nodemailer lib
import nodemailer from 'nodemailer';
// Utils
import { MAIL_PASS, MAIL_USER } from '../utils/constant';

/**
 * Class module to configure and send email
 */

class Mail {
    private mailTransport;

    constructor() {
        this.mailTransport = nodemailer.createTransport({
            host: 'smtp.mailtrap.io',
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
        // mailBodyKeys
    }: { to: string, mailBodyKeys?: any }): Promise<boolean> => {
        const message = {
            from: 'from-example@email.com',
            to,
            subject: 'Welcome',
            html: '<h1>Welcome</h1>'
        };

        const result = await this.mailTransport.sendMail(message);

        // if message is sent we have a corressponding messageId is generated
        return !!result?.messageId;
    };
};

export default new Mail();

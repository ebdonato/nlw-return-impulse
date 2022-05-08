import {MailAdapter, SendMailData} from "../mail-adapter"
import nodemailer from "nodemailer"

const host: string | undefined = process.env.MAIL_HOST
const port: number | undefined = +(process.env.MAIL_PORT || "2525")
const user: string | undefined = process.env.MAIL_AUTH_USER
const pass: string | undefined = process.env.MAIL_AUTH_PASS

const transport = nodemailer.createTransport({
    host,
    port,
    auth: {
        user,
        pass,
    },
})

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject, body: html}: SendMailData) {
        await transport.sendMail({
            from: "Equipe Feedget <oi@feedget.com>",
            to: "Eduardo Donato <eduardo.donato@gmail.com>",
            subject,
            html,
        })
    }
}

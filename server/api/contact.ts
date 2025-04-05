import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const config = useRuntimeConfig()

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.SMTP_USER,
            pass: config.SMTP_PASS
        },
        tls: process.env.NODE_ENV === 'development'
            ? { rejectUnauthorized: false }
            : undefined, // rien en prod, sécurisé par défaut
    })

    const mailOptions = {
        from: `"${body.name}" <${body.email}>`,
        to: process.env.SMTP_TO,
        subject: 'Nouveau message depuis le site',
        text: `
            Nom : ${body.lastName}
            Prenom : ${body.firstName}
            Date de naissance : ${body.birthDate}
            Date d'arrivée en France : ${body.landDate}
            Situation administrative : ${body.situation}
            Motif de la demande : ${body.requestMotif}
            Informations complémentaires : ${body.moreInfo}
        `
    }

    try {
        await transporter.sendMail(mailOptions)
        return { success: true }
    } catch (error) {
        console.error('Erreur envoi mail:', error)
        throw createError({ statusCode: 500, message: 'Erreur lors de l’envoi de l’email' })
    }
})

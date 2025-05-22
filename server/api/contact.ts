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
        text: ''
    }

    switch (body.situation) {
        case 'organization':
            mailOptions.text = `
            Nom de l'association : ${body.organizationName}
            Numéro de téléphone : ${body.phoneNumber}
            Adresse mail : ${body.email}
            Motif de la demande : ${body.requestMotif}
            Informations complémentaires : ${body.moreInfo}
        `
            break;
        case 'lawyer':
            mailOptions.text = `
            Nom du cabinet : ${body.lawyerName}
            Numéro de téléphone : ${body.phoneNumber}
            Adresse mail : ${body.email}
            Motif de la demande : ${body.requestMotif}
            Informations complémentaires : ${body.moreInfo}
        `
            break;
        case 'company':
            mailOptions.text = `
            Nom de l'entreprise : ${body.companyName}
            Numéro de téléphone : ${body.phoneNumber}
            Adresse mail : ${body.email}
            Motif de la demande : ${body.requestMotif}
            Informations complémentaires : ${body.moreInfo}
        `
            break;
        case 'individual':
            mailOptions.text = `
            Nom : ${body.lastName}
            Prenom : ${body.firstName}
            Numéro de téléphone : ${body.phoneNumber}
            Adresse mail : ${body.email}
            Date de naissance : ${body.birthDate}
            Date d'arrivée en France : ${body.landDate}
            Motif de la demande : ${body.requestMotif}
            Informations complémentaires : ${body.moreInfo}
        `
            break;
    }

    try {
        await transporter.sendMail(mailOptions)
        return { success: true }
    } catch (error) {
        console.error('Erreur envoi mail:', error)
        throw createError({ statusCode: 500, message: 'Erreur lors de l’envoi de l’email' })
    }
})

const mailer = require('nodemailer');

module.exports = class SendMailer{
    emailHost = 'perfectaperfecta@gmail.com';
    hostConfig = {
        service: 'gmail',
        auth : {
            'user': '',
            'pass': ''
        }
    }


    sendContactForm = (name, email, phone, message) => new Promise(async (resolve, reject) => {
        if(!name || !email || !phone || !message){
            reject();
        }
        let titleOfEmail = "Contato - Perfecta";
        message += " Telefone de contato: "+phone;

        makeSend(email, titleEmail, message).then(() => resolve()).catch(() => reject());
    });

    makeSend = (emailSend, titleEmail, emailBody) => new Promise(async (resolve, reject) => {
        //Setting configs to mailer
        let configs = {
            from: this.emailHost,
            to: emailBody,
            subject: titleEmail,
            text: emailBody            
        }

        //Setting Transporter
        let transporter = mailer.createTransport(this.hostConfig);

        await transporter.sendMail(configs, (error, info) => {
            if(error){
                console.log('Não foi possível enviar.'+info);
                reject();
            }
            resolve();   
        });

    });
    
}
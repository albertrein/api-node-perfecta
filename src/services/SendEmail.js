const email = require('nodemailer');

const transporter = email.createTransport({
    service: 'gmail',
    auth : {
        'user': '',
        'pass': ''
    }
});

const configs = {
    from: 'perfecta',
    to: 'perfecta',
    subject: 'Curriculo para vaga: x',
    text: 'Nome, endereço, arquivo;'
    
}

transporter.sendMail(configs, (error, info) => {
    if(error){
        console.log('Não foi possível enviar.'+info);
        return false;
    }
    return true;    
})
/*Todo:
    - Set name file to send.
    - Make this a class to instance any time any where.
*/
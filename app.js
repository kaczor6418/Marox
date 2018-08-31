const express = require('express');
const bodyPatser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extend: false }));
app.use(bodyParser.json());

app.get('/', (req,res) => {
  res.send();
});

app.post('/send', (req, res) => {
  const output = `
  <p>Masz nowa prośbę o nawiązanie kntaktu</p>
  <h3>Informacje kontaktowe</h3>
  <ul>
    <li>Imie i nazwisko : ${req.body.name} </li>
    <li>Email : ${req.body.email} </li>
    <li>Temat wiadomości : ${req.body.subject} </li>
  </ul>
  <h3>Wiadomość</h3>
  <p> ${req.body.message} </p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'pphmarox@gamil.com', // generated ethereal user
        pass: account.pass // generated ethereal password
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Marox website" <pphmarox@gamil.com>', // sender address
      to: 'pphmarox@gamil.com', // list of receivers
      subject: 'Nowe zapytanie o kontakt', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {msg: 'Email został wysłany'});
  });

});

app.listen(3000, () => console.log('Server started...'));
const dotenv = require('dotenv');
dotenv.config();

const sgMail = require('@sendgrid/mail');
console.log('API Key:', process.env.SENDGRID_API_KEY); // Verificación

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.enviarConfirmacion = async (req, res) => {
  const { to_email, doctor, date, time, specialty } = req.body;

  const msg = {
    to: to_email,
    from: process.env.SENDER_EMAIL,
    subject: 'Confirmación de cita médica',
    text: `Su cita con el ${doctor} está confirmada para el ${date} a las ${time}. Especialidad: ${specialty}`,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: 'Correo enviado correctamente.' });
  } catch (error) {
    console.error('❌ ERROR al enviar correo:', error.response?.body || error.message);
    res.status(500).json({ message: 'Error al enviar el correo.' });
  }
};

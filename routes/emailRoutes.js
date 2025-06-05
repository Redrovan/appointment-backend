const express = require('express');
const { enviarConfirmacion } = require('../controllers/emailController');

const router = express.Router();

router.post('/confirmacion-cita', enviarConfirmacion);

module.exports = router;

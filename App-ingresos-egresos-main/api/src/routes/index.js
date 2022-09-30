const { Router } = require('express');
const accountRouter = require('./accountRouter.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/account',accountRouter)

module.exports = router;

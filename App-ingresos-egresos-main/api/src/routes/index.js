const { Router } = require('express');
const accountRouter = require('./accountRouter.js');
const routeStaff = require ('./staffRouter')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/account',accountRouter)
router.use('/staff', routeStaff);

module.exports = router;

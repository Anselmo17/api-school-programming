// express configs
var express = require('express');
var app = express();
var morgan = require('morgan');
var router = express.Router();
var bodyParser = require('body-parser');

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Definindo a porta onde será executada nossa api:
var port = process.env.port || 8082;

// exportando configs
module.exports = router;

// Controllers
const USerController = require('./src/routers/usersControllers');
const AlunosController = require('./src/routers/alunosController');


// case not found routers
router.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err) 
})


// case errors
router.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        err: {
            message: error.message
        }
    })
})

// adicionando as rotas
app.use(router);

// Iniciando a aplicação e rodando
app.listen(port);
console.log("Iniciando app na porta : http://localhost:" + port);

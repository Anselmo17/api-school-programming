// auth
const jwt = require('jsonwebtoken');
const SECRET = require('../configs/configGlobal').SECRET;
const CONFIG = require('../configs/configGlobal');

// encrypt os dados
const bcrypt = require('bcryptjs');
// controllers de rotas
const router = require('../../app');
// models
const User = require('../models/users');
// validationJwt
const {verifyJWT} = require('../Helpers/validationJwt');


// Rotas API

// GENERATOR TOKEN USER
router.post('/userToken', async (req, res) => {

    const user = await User.findOne({email: req.body.email, password: req.body.password});
    // valida o usuario
    if (user) { // cria hash na senha do usuario
        const passwordHash = bcrypt.hashSync(req.body.password, 8)

        // cria o login do usuario
        try {
            const response = await User.create({name: req.body.nome, email: req.body.email, password: passwordHash});

            // gera o token ao usuario que dura 20 minutos
            const token = jwt.sign({
                id: response.id
            }, SECRET, {expiresIn: CONFIG.TIME});

            // remove senha da resposta ao usuaro
            response.password = undefined;

            // obj para devolver
            const dataUser = {
                auth: true,
                token,
                user: response
            };

            // devolve os dados autenticados
            res.send(dataUser);

            // caso tenha erro
        } catch (e) {
            console.log('== Erro ====> ' + e.message);
            res.status(500).send({message: e});
        }
    } else { // devolve resposta sem sucesso
        res.status(500).send({auth: false, message: 'Login invalido'});
    };

});


// CONSULTA USERS
router.get('/users', verifyJWT, async (req, res, next) => {
    try {
        const result = await User.find({}, {password: false});

        result.length && result[0].password ? result.map((item) => {
            item.password = undefined;
            return {
                ...item
            }
        }) : result;


        if (!res) {
            res.status(400).send({Error: "houve um erro na requisicao."});
        }
        res.send({message: "Logado com sucesso", data: result});
    } catch (error) {
        console.log('----------------', error)
       const err = new Error(error);
       err.httpStatusCode = 500;
         return next(err); //res.status(400).send({Error: "houve um erro na requisicao."}));
    }

});


// REMOVE USER
router.delete('/user', verifyJWT, async (req, res, next) => {

    const id = req.query.id;

    const result = await User.deleteOne({_id: id});

    if (result.deletedCount > 0) {
        res.send({message: "Deletado com sucesso"});
    } else {
        res.status(400).send({message: "Não foi possivel remover o dado."});
    }

});


module.exports = router;

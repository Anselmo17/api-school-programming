// controllers de rotas
const router = require('../../app');
// models
Alunos = require('../models/alunos');

// validaton routers
const {verifyJWT} = require('../Helpers/validationJwt');


// CREATE ALUNOS
router.post('/alunos', async (req, res) => { 

    const {
        name_aluno,
        birthday,
        class_shift,
        course,
        name_teacher,
        module_curse
    } = req.body;

    try {
        const response = await Alunos.create({
            name_aluno,
            birthday,
            class_shift,
            course,
            name_teacher,
            module_curse
        });

        // obj para devolver
        const dataUser = {
            insert: true,
            user: response
        };

        // devolve os dados da criação
        res.status(201).send(dataUser);

        // caso tenha erro
    } catch (e) {
        console.log('== Erro ====> ' + e.message);
        res.status(500).send({message: e});
    }
});


// CONSULTA ALUNOS
router.get('/alunos', verifyJWT, async (req, res, next) => {

    try {
        const result = await Alunos.find();

        if (! result) {
            res.status(400).send({Error: "houve um erro na requisicao."});
        }
        res.send({data: result});
    } catch (error) {
        console.log('----------------', error)
        return next(err);
    }
});


// DELETE ALUNO 
router.delete('/alunos', verifyJWT, async (req, res, next) => {

    const id = req.query.id;

    const result = await Alunos.deleteOne({_id: id});

    console.log(result,'------------', 'antes ', id)
    if (result.deletedCount > 0) {
        res.send({message: "Deletado com sucesso"});
    } else {
        res.status(400).send({message: "Não foi possivel remover o dado."});
    }

});


module.exports = router;

const jwt = require('jsonwebtoken');
const SECRET = 'dev_secret';


// dados a ser enviados 
const params = {
  name: "Fulano",
  email: "fulano@gmail.com"
};


// gera token 
// passa o dados e a palavra secreta
// codifica as informacoes
const token = jwt.sign({ data: params }, SECRET, {

  // expirar em 20 minutos 
  expiresIn: '20m'
});


// decodificando os dados do token e palavra secreta
var decoded = jwt.verify(token, SECRET);
console.log(decoded)



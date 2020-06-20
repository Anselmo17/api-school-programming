const mongoose = require("mongoose");
const configs = require('../configs/configGlobal');

// config mongo
const mongoDb = configs.DATABASE_MONGO_DB;

// connecta no mongoDb
mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true });

// status connection 
const dbConnection = mongoose.connection;

// escutando e testando a conexao
dbConnection.on("connected", () => console.log(`<<< Status conexao MongoDb : CONECTADO >>>>`));
dbConnection.on("disconnected", () => console.log(`<<< Status conexao MongoDb : DESCONECTADO AGORA >>>>`));

// erro na conexao 
dbConnection.on("error", () => console.log(`<<< Status conexao MongoDb : ERRO NA CONEXAO >>>>`));

module.exports = mongoose;

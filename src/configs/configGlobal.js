const configDev = require('./config-dev');
const configPrd = require('./config-prd');

let configs;


// CONFIGS ENVIRONMENT
if (process.env.NODE_ENV === 'production') {
    configs = configPrd;
} else {
    configs = configDev;
}


module.exports = configs;


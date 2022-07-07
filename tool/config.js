require("dotenv").config();

async function ReadConfig() {
    const config = {
        link : process.env.DATA_URL,
        server : {
            port: process.env.PORT
        }
    }
    return config;
}   
module.exports = ReadConfig;

const log = console.log;

console.log = function (...args) {
    args.unshift(new Date());
    log.apply(console ,args);       
}

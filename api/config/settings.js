const convict = require('convict');
const fs = require('fs');

let conf = convict({
    env: {
        doc: "The application environment.",
        format: ["production", "development", "staging", "test"],
        default: "development",
        env: "NODE_ENV"
    },
    ynab: {
        doc:"Personal YNAB settings, api key, budget id",
        budgetId:"",
        accessToken:""
    },
    ip: {
        doc: "The IP address to bind.",
        format: "ipaddress",
        default: "127.0.0.1",
        env: "IP_ADDRESS",
    },
    port: {
        doc: "The port to bind.",
        format: "port",
        default: 4040,
        env: "PORT"
    },
    mongo: {
        doc: "Mongo config variables",
        url: {
            doc: "Mongo connection url",
            default:'mongodb://localhost/',
            env: "MONGO_URL"
        },
        name: {
            doc: "Mongo db name",
            default: "snowball",
            env: "MONGO_DB"
        },
        debug: false
    },
    auth: {
        password_salt: "Dz63N98f1BzJdpLjk9LVtCWkQS5M96mBCBIQuwfZ8lzw85ogiH8kDZNdkQkxC0kwUzC06yGRN5jGXgvDbaVMyaHcVUN1WYmI5CeJ",
        token: {
            maxAge: 60*60*1000*24*30,
            salt: "alsdflajsdlf"
        }
    }
});


let env = conf.get('env');
console.log("port before loading env specifics %s, env port %s", conf.get('port'),process.env.PORT);
conf.loadFile(__dirname + '/'+  env + '_config.json');
if(fs.existsSync(__dirname + '/local_config.json')) {
    conf.loadFile(__dirname + '/local_config.json');
}

conf.validate();


module.exports = conf;



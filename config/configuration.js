var fs = require("fs");
var env = require("process").env;
const os = require('os');
const configFolder = "config";
const defaultConfigName = "default";
const configExtension = "json";
class Configuration{
    constructor(){
        function getConfigName() {
            var envfile = `${configFolder}/${env.NODE_ENV}.${configExtension}`;
            if (fs.existsSync(envfile))
            {
                console.log(`Using ${env.NODE_ENV} configuration`);
                return envfile;
            }
            console.log("Using default configuration");
            return `${configFolder}/${defaultConfigName}.${configExtension}`;
        };
    
        const data = fs.readFileSync(getConfigName(), 'utf8');
        const configObject = JSON.parse(data);
        this.port = configObject.server.port;
        this.name = configObject.server.name;
        this.version = configObject.server.version;    
        this.allowedHosts = configObject.whitelist.allowed;
        this.deniedHosts = configObject.whitelist.denied;
        this.secret = configObject.secret;
        this.filesPath = `${os.homedir}${configObject.filesPath}`;
    }
 };
 module.exports.Configuration = new Configuration();


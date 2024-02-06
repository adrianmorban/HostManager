import fs from 'node:fs';
import initialConfig from './config.js';
import { validator } from './validator.js';
import { help, addHostToHostsFile, argumentList, addHostToXamppHostsFile, removeHostFromHostsFile, removeHostFromXamppHostsFile, formatProjectPath } from './utilities.js';

validator(process.argv);

let defaultProjectPath = '';

try{
    let configData = fs.readFileSync('config.json', 'utf-8');
    let config = JSON.parse(configData);
    defaultProjectPath = config.defaultProjectPath;
    if(defaultProjectPath === undefined){
        console.log('Project path not found in config.json');
        defaultProjectPath = await initialConfig();
        process.exit(0);
    }
}
catch(e){
    console.log('Config file not found');
    defaultProjectPath = await initialConfig();
}

let action = process.argv[2];

switch(action){
    case 'add':
        let argList = argumentList(process.argv);
        let ip = argList.ip;
        let domain = argList.domain;
        let projectPath = argList.projectPath;
        let publicFlag = argList.publicFlag ? true : false;
        try{
            addHostToHostsFile(domain, ip);
            addHostToXamppHostsFile(domain, formatProjectPath(defaultProjectPath, projectPath, domain, publicFlag));
            process.exit(0);
        }
        catch(e){
            console.log(e);
            process.exit(0);
        }
    case 'remove':
        try{
            removeHostFromHostsFile(process.argv[3]);
            removeHostFromXamppHostsFile(process.argv[3]);
            process.exit(0);
        }
        catch(e){
            console.log(e);
            process.exit(0);
        }
    case 'config':
        initialConfig();
        break;
    case 'help':
        console.log(help);
        break;
    default:
        console.log('Invalid action');
        process.exit(0);
}
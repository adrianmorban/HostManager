import fs from 'fs';

let xamppHostsFile = 'C:\\xampp\\apache\\conf\\extra\\httpd-vhosts.conf';
let hostsFile = 'C:\\Windows\\System32\\drivers\\etc\\hosts';

const addHostToHostsFile = (domain, ip = '127.0.0.1') => {
    if(ip === undefined || ip === '') ip = '127.0.0.1';
    let entry = `\n${ip} ${domain}`;
    fs.appendFileSync(hostsFile, entry);
    console.log(`Added ${entry} to ${hostsFile}`);
}

const addHostToXamppHostsFile = (domain, projectPath) => {
    let entry = `
<VirtualHost *:80>
    DocumentRoot "${projectPath}"
    ServerName ${domain}
</VirtualHost>\n`;
    fs.appendFileSync(xamppHostsFile, entry);
    console.log(`Added ${entry} to ${xamppHostsFile}`);
}

const removeHostFromHostsFile = (domain) => {
    let data = fs.readFileSync(hostsFile, 'utf-8');
    let newData = data.replace(new RegExp(`\\n.*${domain}`), '');
    fs.writeFileSync(hostsFile, newData);
    console.log(`Removed ${domain} from ${hostsFile}`);
}

const removeHostFromXamppHostsFile = (domain) => {
    let data = fs.readFileSync(xamppHostsFile, 'utf-8');
    let newData = data.replace(new RegExp(`\\n.*${domain}`), '');
    fs.writeFileSync(xamppHostsFile, newData);
    console.log(`Removed ${domain} from ${xamppHostsFile}`);
}

const formatProjectPath = (defaultProjectPath, projectPath, domain, publicFlag) => {

    let finalProjectPath = '';

    if(projectPath === undefined || projectPath === ''){
        projectPath = defaultProjectPath;
        if(projectPath.charAt(projectPath.length - 1) === '\\') projectPath = projectPath.slice(0, -1);
        console.log('no se lo mando');
        finalProjectPath = `${projectPath}\\${domain}${(publicFlag ? '\\public' : '')}`;
    }
    else{
        if(projectPath.charAt(projectPath.length - 1) === '\\') projectPath = projectPath.slice(0, -1);
        finalProjectPath = `${projectPath}${(publicFlag ? '\\public' : '')}`;
    }
    return finalProjectPath;
}

const argumentList = (argv) => {

    let argList = {
        ip: '',
        domain: '',
        projectPath: '',
        publicFlag: false
    };

    if(argv.includes('-i')){
        argList.ip = argv[argv.indexOf('-i') + 1];
    }

    if(argv.includes('-d')){
        argList.domain = argv[argv.indexOf('-d') + 1];
    }

    if(argv.includes('-p')){
        argList.projectPath = argv[argv.indexOf('-p') + 1];
    }

    if(argv.includes('--public')){
        argList.publicFlag = true;
    }

    return argList;
}

const help = `Usage:
node hostManager.js add -i <ip> -d <domain> -p <projectPath> --public
node hostManager.js remove <domain>
node hostManager.js config (to change the default project path)
PSD: use the flag --public when adding a host to make the virtual host point to the public folder of the project
PSD2: if no project path is provided, the default project path will be used and the domain will be used as the project folder name
PSD3: if no ip is provided, the default ip will be used (127.0.0.1)
PSD4: if no domain is provided, the program will exit
`;

export { help, formatProjectPath, argumentList, addHostToHostsFile, addHostToXamppHostsFile, removeHostFromHostsFile, removeHostFromXamppHostsFile };
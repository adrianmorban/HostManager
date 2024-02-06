import fs from 'fs';

const validator = (argv) => {
    if(argv[2] === undefined) {
        console.log('Invalid action');
        process.exit(0);
    }
    switch(argv[2]) {
        case 'add':
            validateAdd(argv);
            break;
        case 'remove':
            validateRemove(argv);
            break;
        case 'config':
            break;
        case 'help':
            break;
        default:
            console.log('Invalid action');
            process.exit(0);
    }
}

const validateAdd = (argv) => {

    if(argv.length < 4) {
        console.log('Insufficient parameters');
        process.exit(0);
    }

    if(argv.includes('-i')){
        if(argv[argv.indexOf('-i') + 1] === undefined || !isAValidIP(argv[argv.indexOf('-i') + 1])) {
            console.log('Invalid ip address');
            process.exit(0);
        }
    }

    if(argv.includes('-p')){
        if(argv[argv.indexOf('-p') + 1] === undefined) {
            console.log('Invalid parameters');
            process.exit(0);
        }
        let path = argv[argv.indexOf('-p') + 1];
        if (!fs.existsSync(path)) {
            console.log('Path does not exist');
            process.exit(0);
        }
    }

    if(!argv.includes('-d')) {
        console.log('At least one domain is required');
        process.exit(0);
    }

    if(isAValidDomain(argv[argv.indexOf('-d') + 1])) {
        console.log('Invalid domain');
        process.exit(0);
    }
}

const validateRemove = (argv) => {

    let domain = argv[3];

    if(domain === undefined || domain === '') {
        console.log('Invalid parameters');
        process.exit(0);
    }
}

const isAValidIP = (ip) => {
    return ip.match(/^(\d{1,3}\.){3}\d{1,3}$/);
}

const isAValidDomain = (domain) => {
    return domain === undefined || domain === '' || domain.charAt(0) === '-' || domain.charAt(domain.length - 1) === '-' || domain.includes(' ');
}


export { validator };
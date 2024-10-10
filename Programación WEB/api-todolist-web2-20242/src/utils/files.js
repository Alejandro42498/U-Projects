import fs from 'fs';

const FILEMAME = 'tasks.json';

function read(){
    return JSON.parse(fs.readFileSync(FILEMAME));
}

function write(data){  
    fs.writeFileSync(FILEMAME, JSON.stringify(data));
}

export {
    read,  
    write
}
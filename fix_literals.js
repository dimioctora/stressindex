const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
        }
    });
    return results;
}

const files = walk('frontend/src/app').concat(walk('frontend/src/components'));
let changedFiles = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;
    
    // Fix: fetchApi("/admin/...${id}...") => fetchApi(`/admin/...${id}...`)
    content = content.replace(/fetchApi\("([^"]*\$\{[^"]*)"\)/g, 'fetchApi(`$1`)');
    content = content.replace(/fetchApi\("([^"]*\$\{[^"]*)",/g, 'fetchApi(`$1`,');

    if (content !== originalContent) {
        fs.writeFileSync(file, content);
        changedFiles++;
        console.log('Fixed quotes in ' + file);
    }
});
console.log('Total files fixed: ' + changedFiles);

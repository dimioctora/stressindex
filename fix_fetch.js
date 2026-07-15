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
    
    // Check if file contains hardcoded URLs
    if (content.includes('http://127.0.0.1:8000/api') || content.includes('http://localhost:8000/api')) {
        
        // Add import statement if not exists
        if (!content.includes('import { fetchApi }')) {
            // Find the last import line
            const importLines = content.split('\n').filter(l => l.startsWith('import '));
            if (importLines.length > 0) {
                const lastImport = importLines[importLines.length - 1];
                content = content.replace(lastImport, lastImport + '\nimport { fetchApi } from "@/lib/api";');
            } else {
                content = 'import { fetchApi } from "@/lib/api";\n' + content;
            }
        }

        // Dashboard specific fix
        content = content.replace(/fetch\("http:\/\/127\.0\.0\.1:8000\/api\/admin\/dashboard",\s*\{\s*headers:\s*\{\s*'Authorization':\s*`Bearer \$\{token\}`,\s*'Accept':\s*'application\/json',\s*\}\s*\}\)/g, 'fetchApi("/admin/dashboard")');
        content = content.replace(/const token = localStorage\.getItem\('admin_token'\);\s*/g, '');

        // Replace other exact string fetches
        content = content.replace(/fetch\([`"']http:\/\/127\.0\.0\.1:8000\/api(\/[^`"']+)[`"']\)/g, 'fetchApi("$1")');
        
        // Replace fetch with options object
        content = content.replace(/fetch\([`"']http:\/\/127\.0\.0\.1:8000\/api(\/[^`"']+)[`"'],/g, 'fetchApi("$1",');
        content = content.replace(/fetch\([`"']http:\/\/localhost:8000\/api(\/[^`"']+)[`"'],/g, 'fetchApi("$1",');

        // Replace template literal URLs
        content = content.replace(/fetch\(`http:\/\/127\.0\.0\.1:8000\/api(\/[^`]+)`\)/g, 'fetchApi(`$1`)');
        content = content.replace(/fetch\(`http:\/\/127\.0\.0\.1:8000\/api(\/[^`]+)`,\s*\{/g, 'fetchApi(`$1`, {');

        // For dynamic URL variables
        content = content.replace(/const url = isAdd \? "http:\/\/127\.0\.0\.1:8000\/api(\/admin\/administrators)" : `http:\/\/127\.0\.0\.1:8000\/api(\/admin\/administrators\/\$\{formData\.id\})`;/g, 
            'const url = isAdd ? "$1" : `$2`;');
            
        if(content.includes('const url = isAdd ? "/admin/administrators"')) {
           content = content.replace(/fetch\(url,\s*\{/g, 'fetchApi(url, {');
        }

        if (content !== originalContent) {
            fs.writeFileSync(file, content);
            changedFiles++;
            console.log('Updated ' + file);
        }
    }
});
console.log('Fixed fetch in ' + changedFiles + ' files.');

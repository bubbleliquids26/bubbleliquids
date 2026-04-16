import fs from 'fs';
import path from 'path';

function processDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (!content.includes('"use client"') && !content.includes("'use client'")) {
                const needsClient = 
                    content.match(/use(State|Effect|Reducer|Callback|Memo|Ref|Context|Location|Pathname|Router|SearchParams|Params)\b/) ||
                    content.match(/from ['"]framer-motion['"]/) ||
                    content.match(/from ['"]react-hook-form['"]/) ||
                    content.includes('createContext') ||
                    content.match(/from ['"]@radix-ui/) ||
                    content.includes('onClick') ||
                    content.includes('onChange') ||
                    content.includes('onSubmit') ||
                    fullPath.includes('components/ui/'); // shadcn ui components
                
                if (needsClient && !fullPath.includes('app/layout.tsx')) {
                    fs.writeFileSync(fullPath, '"use client";\n\n' + content);
                }
            }
        }
    });
}
processDir(path.join(process.cwd(), 'src'));
console.log('Added use client directives.');

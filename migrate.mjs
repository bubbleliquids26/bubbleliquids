import fs from 'fs';
import path from 'path';

const basePath = process.cwd();
const srcPath = path.join(basePath, 'src');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// Moves
const moves = [
  ['pages/Index.tsx', 'app/page.tsx'],
  ['pages/Products.tsx', 'app/products/page.tsx'],
  ['pages/ProductDetail.tsx', 'app/products/[id]/page.tsx'],
  ['pages/ComboOffers.tsx', 'app/combo-offers/page.tsx'],
  ['pages/AboutUs.tsx', 'app/about-us/page.tsx'],
  ['pages/NotFound.tsx', 'app/not-found.tsx'],
];

for (const [srcFile, destFile] of moves) {
  const src = path.join(srcPath, srcFile);
  const dest = path.join(srcPath, destFile);
  if (fs.existsSync(src)) {
    ensureDir(path.dirname(dest));
    fs.renameSync(src, dest);
    console.log(`Moved ${srcFile} to ${destFile}`);
  }
}

// Regex replaces
function processFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const stat = fs.statSync(filePath);
  if (stat.isDirectory()) {
    fs.readdirSync(filePath).forEach(file => processFile(path.join(filePath, file)));
    return;
  }
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // React Router replacements
  if (content.includes('react-router-dom')) {
    // NavLink special case handling
    if (filePath.includes('NavLink.tsx')) {
      content = `"use client";\nimport Link from "next/link";\nimport { usePathname } from "next/navigation";\nimport { forwardRef } from "react";\nimport { cn } from "@/lib/utils";\n\ninterface NavLinkCompatProps extends React.ComponentPropsWithoutRef<typeof Link> {\n  className?: string;\n  activeClassName?: string;\n  pendingClassName?: string;\n}\n\nconst NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(\n  ({ className, activeClassName, pendingClassName, href, ...props }, ref) => {\n    const pathname = usePathname();\n    const isActive = pathname === href;\n    return (\n      <Link\n        ref={ref}\n        href={href}\n        className={cn(className, isActive && activeClassName)}\n        {...props}\n      />\n    );\n  },\n);\n\nNavLink.displayName = "NavLink";\n\nexport { NavLink };\n`;
      fs.writeFileSync(filePath, content);
      return;
    }

    // Generic replacements
    if (content.includes('import { Link')) {
        content = content.replace(/import\s+\{\s*([^}]*?)Link([^}]*?)\}\s+from\s+['"]react-router-dom['"];?/g, (match, before, after) => {
            const others = [before, after].map(s => s.trim()).filter(Boolean).join(', ');
            let res = `import Link from "next/link";\n`;
            if (others) {
                res += `import { ${others} } from "next/navigation";`;
            }
            return res;
        });
        changed = true;
    }
    
    // Remaining react-router hooks
    if (content.includes('react-router-dom')) {
        content = content.replace(/from\s+['"]react-router-dom['"]/g, 'from "next/navigation"');
        changed = true;
    }
  }

  if (content.includes(' useLocation(')) {
      content = content.replace(/useLocation\(\)/g, 'usePathname()');
      content = content.replace(/import\s*\{\s*([^}]*?)useLocation([^}]*?)\}\s*from\s*['"]next\/navigation['"]/g, "import { $1usePathname$2} from 'next/navigation'");
      changed = true;
  }

  // Replace <Link to= with <Link href=
  // Also RouterNavLink to=
  content = content.replace(/<Link\s+([^>]*?)to=/g, '<Link $1href=');
  content = content.replace(/<RouterNavLink\s+([^>]*?)to=/g, '<RouterNavLink $1href=');
  content = content.replace(/<NavLink\s+([^>]*?)to=/g, '<NavLink $1href=');

  if (changed || content.includes('<Link') || content.includes('href=')) {
      fs.writeFileSync(filePath, content);
  }
}

processFile(srcPath);
console.log('Migration script complete');

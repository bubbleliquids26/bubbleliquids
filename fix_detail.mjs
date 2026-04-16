import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

let content = execSync('git show HEAD:src/pages/ProductDetail.tsx').toString();

content = content.replace(
  `import { useParams, Link, useSearchParams } from 'react-router-dom';`,
  `import Link from 'next/link';\nimport { useParams, useSearchParams } from 'next/navigation';`
);

content = `"use client";\n\n` + content;

content = content.replace(/<Link\s+([^>]*?)to=/g, '<Link $1href=');
content = content.replace(/<Link\s+to=/g, '<Link href=');

content = content.replace(
  `const { id } = useParams<{ id: string }>();`,
  `const params = useParams();\n  const id = params?.id as string;`
);

content = content.replace(
  `const [searchParams] = useSearchParams();`,
  `const searchParams = useSearchParams();`
);

content = content.replace(
  `const sizeParam = searchParams.get('size');`,
  `const sizeParam = searchParams?.get('size') ?? null;`
);

content = content.replace(
  `variantMl={selectedSizeObj.ml}`,
  `variantMl={selectedSizeObj?.ml}`
);

fs.writeFileSync(path.join(process.cwd(), 'src/app/products/[id]/page.tsx'), content);
console.log('Restored and fixed page.tsx');

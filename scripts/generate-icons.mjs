import sharp from 'sharp';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const svgBuffer = readFileSync(join(root, 'app', 'icon.svg'));

const sizes = [
  { size: 512, output: join(root, 'public', 'icon-512.png') },
  { size: 192, output: join(root, 'public', 'icon-192.png') },
  { size: 180, output: join(root, 'public', 'apple-icon.png') },
  { size: 32,  output: join(root, 'public', 'icon.png') },
  // overwrite the app folder icon.png too
  { size: 512, output: join(root, 'app', 'icon.png') },
];

for (const { size, output } of sizes) {
  await sharp(svgBuffer)
    .resize(size, size)
    .png()
    .toFile(output);
  console.log(`✅ Generated ${size}x${size} → ${output}`);
}

console.log('\n🎉 All icons generated successfully!');

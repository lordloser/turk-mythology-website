const fs = require('fs');
const path = require('path');
const os = require('os');

const home = os.homedir();
const src = path.join(home, '.gemini', 'antigravity', 'brain', '1e06fd16-da3c-4fbd-b78b-fc754db3c273', 'umay_ana_1774611464975.png');
const destDir = path.join(home, 'Desktop', 'turk-mitoloji', 'turk-mythology-website', 'public', 'images');
const dest = path.join(destDir, 'umay-ana.png');
const audioDir = path.join(home, 'Desktop', 'turk-mitoloji', 'turk-mythology-website', 'public', 'audio');

try {
  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(src, dest);
  fs.mkdirSync(audioDir, { recursive: true });
  console.log('Successfully copied umay-ana.png and created audio dir');
} catch (e) {
  console.error('Error:', e.message);
}

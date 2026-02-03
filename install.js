#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TARGET_DIR = path.join(process.cwd(), 'my-waifu');

console.log('\x1b[35m🌸 OpenWaifu Official Installer v0.1.0\x1b[0m');
console.log('------------------------------------------');

function copyRecursiveSync(src, dest) {
    if (src.includes('node_modules') || src.includes('.git') || src.includes('.DS_Store')) return;
    const stats = fs.statSync(src);
    if (stats.isDirectory()) {
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
        fs.readdirSync(src).forEach(child => copyRecursiveSync(path.join(src, child), path.join(dest, child)));
    } else {
        fs.copyFileSync(src, dest);
    }
}

async function run() {
    try {
        console.log(`📦 \x1b[36mSetting up OpenWaifu in:\x1b[0m ${TARGET_DIR}...`);
        
        if (fs.existsSync(TARGET_DIR)) {
            console.warn('\x1b[33m⚠️  Warning: Target folder already exists. Files may be overwritten.\x1b[0m');
        }

        copyRecursiveSync(__dirname, TARGET_DIR);

        process.chdir(TARGET_DIR);

        console.log('\n⚙️  \x1b[36mInstalling project dependencies (this may take a minute)...\x1b[0m');
        try {
            // Using shell: true for Windows compatibility
            execSync('npm install', { stdio: 'inherit', shell: true });
        } catch (e) {
            console.warn('\x1b[33m⚠️ npm install had some warnings, but continuing...\x1b[0m');
        }

        const wizardPath = path.join(TARGET_DIR, 'openwaifu', 'onboarding', 'wizard', 'index.html');
        console.log('\n\x1b[32m✅ Installation complete!\x1b[0m');
        console.log(`🚀 \x1b[35mOpening your Waifu Creation Wizard...\x1b[0m`);

        const openCmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
        execSync(`${openCmd} "${wizardPath}"`, { shell: true });

        console.log('\n------------------------------------------');
        console.log('\x1b[35mYour Waifu journey begins now.\x1b[0m');
        console.log(`Project folder: ${TARGET_DIR}`);
        console.log('\x1b[36mNext steps:\x1b[0m');
        console.log('1. Follow the wizard in your browser.');
        console.log('2. Run \x1b[32mnode openclaw.mjs gateway\x1b[0m inside the folder to wake her up.');
    } catch (error) {
        console.error('\n\x1b[31m❌ Installation failed:\x1b[0m', error.message);
        process.exit(1);
    }
}

run();

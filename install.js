#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TARGET_DIR = path.join(process.cwd(), 'my-waifu');

console.log('\x1b[35m🌸 OpenWaifu Official Installer v0.1.1\x1b[0m');
console.log('------------------------------------------');

async function run() {
    try {
        console.log(`📦 \x1b[36mDeploying OpenWaifu engine to:\x1b[0m ${TARGET_DIR}...`);
        
        // Ensure target directory exists
        if (!fs.existsSync(TARGET_DIR)) {
            fs.mkdirSync(TARGET_DIR, { recursive: true });
        } else {
            console.warn('\x1b[33m⚠️  Warning: Target folder already exists. Some files might be skipped or overwritten.\x1b[0m');
        }

        // Use native fs.cpSync (Node 16.7+) for robust recursive copying
        console.log('🚚 Copying core components...');
        fs.cpSync(__dirname, TARGET_DIR, {
            recursive: true,
            filter: (src) => {
                const name = path.basename(src);
                const isIgnored = ['node_modules', '.git', '.DS_Store', 'my-waifu', 'test-install', 'openwaifu-app'].includes(name);
                return !isIgnored;
            }
        });

        // Change to target directory
        process.chdir(TARGET_DIR);

        console.log('\n⚙️  \x1b[36mInstalling dependencies (this takes a moment)...\x1b[0m');
        try {
            // Use shell: true for Windows command resolution
            execSync('npm install', { stdio: 'inherit', shell: true });
        } catch (e) {
            console.warn('\x1b[33m⚠️ npm install completed with warnings.\x1b[0m');
        }

        // Resolve paths for the wizard - relative to the new TARGET_DIR
        const wizardPath = path.join(TARGET_DIR, 'openwaifu', 'onboarding', 'wizard', 'index.html');
        
        if (!fs.existsSync(wizardPath)) {
            throw new Error(`Wizard not found at ${wizardPath}. Installation might be corrupted.`);
        }

        console.log('\n\x1b[32m✅ Installation complete!\x1b[0m');
        console.log(`🚀 \x1b[35mLaunching the Creation Wizard...\x1b[0m`);

        // Platform-specific open command
        const openCmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start ""' : 'xdg-open';
        
        try {
            execSync(`${openCmd} "${wizardPath}"`, { shell: true });
        } catch (e) {
            console.log(`\n👉 Almost there! Please open this file manually in your browser:\n   ${wizardPath}`);
        }

        console.log('\n------------------------------------------');
        console.log('\x1b[35mYour Waifu journey begins now.\x1b[0m');
        console.log(`Folder: ${TARGET_DIR}`);
        console.log('\x1b[36mHow to start:\x1b[0m');
        console.log('1. Complete the setup in your browser.');
        console.log('2. In your terminal, run: \x1b[32mnode openclaw.mjs gateway\x1b[0m');
    } catch (error) {
        console.error('\n\x1b[31m❌ Installation failed:\x1b[0m', error.message);
        console.error('\x1b[33mDebug details:\x1b[0m', error);
        process.exit(1);
    }
}

run();

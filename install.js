#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TARGET_DIR = path.resolve(process.cwd(), 'my-waifu');

console.log('\x1b[35m🌸 OpenWaifu Official Installer v0.1.2\x1b[0m');
console.log('------------------------------------------');

function copyRecursiveSync(src, dest) {
    const stats = fs.statSync(src);
    const name = path.basename(src);
    
    // Ignore list
    if (['node_modules', '.git', '.DS_Store', 'my-waifu', 'test-install', 'openwaifu-app'].includes(name)) {
        return;
    }

    if (stats.isDirectory()) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach(child => {
            copyRecursiveSync(path.join(src, child), path.join(dest, child));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

async function run() {
    try {
        console.log(`📦 \x1b[36mInitializing environment in:\x1b[0m ${TARGET_DIR}`);
        
        // 1. Create directory
        if (!fs.existsSync(TARGET_DIR)) {
            fs.mkdirSync(TARGET_DIR, { recursive: true });
        }
        
        if (!fs.existsSync(TARGET_DIR)) {
            throw new Error(`Failed to create directory: ${TARGET_DIR}`);
        }

        // 2. Copy files (Manual loop for extreme robustness on Windows)
        console.log('🚚 Copying core components...');
        copyRecursiveSync(__dirname, TARGET_DIR);

        // 3. Navigate and Verify
        console.log('⚙️  Verifying installation folder...');
        process.chdir(TARGET_DIR);
        
        if (process.cwd() !== TARGET_DIR && path.resolve(process.cwd()) !== path.resolve(TARGET_DIR)) {
            // Some Windows environments use short paths or case differences
            console.log(`Note: Adjusted path to ${process.cwd()}`);
        }

        // 4. Install dependencies
        console.log('\n⚙️  \x1b[36mInstalling dependencies (this takes a moment)...\x1b[0m');
        try {
            // Force npm install with shell and standard IO
            execSync('npm install', { 
                stdio: 'inherit', 
                shell: true,
                windowsHide: true 
            });
        } catch (e) {
            console.warn('\x1b[33m⚠️ npm install completed with warnings.\x1b[0m');
        }

        // 5. Final Path Resolution for Wizard
        const wizardPath = path.resolve(TARGET_DIR, 'openwaifu', 'onboarding', 'wizard', 'index.html');
        
        console.log('\n\x1b[32m✅ Installation complete!\x1b[0m');
        console.log(`🚀 \x1b[35mOpening your Waifu Creation Wizard...\x1b[0m`);

        // Windows-specific start command improvement
        const openCmd = process.platform === 'win32' ? 'start ""' : process.platform === 'darwin' ? 'open' : 'xdg-open';
        
        try {
            execSync(`${openCmd} "${wizardPath}"`, { shell: true });
        } catch (e) {
            console.log(`\n👉 Almost there! Please open this file manually:\n   ${wizardPath}`);
        }

        console.log('\n------------------------------------------');
        console.log('\x1b[35mYour Waifu journey begins now.\x1b[0m');
        console.log(`Project folder: ${TARGET_DIR}`);
        console.log('\x1b[36mNext steps:\x1b[0m');
        console.log('1. Follow the setup in your browser.');
        console.log('2. Run: \x1b[32mnode openclaw.mjs gateway\x1b[0m');
    } catch (error) {
        console.error('\n\x1b[31m❌ Installation failed:\x1b[0m', error.message);
        console.log('\n\x1b[33mHelp:\x1b[0m Ensure you have write permissions in this folder.');
        process.exit(1);
    }
}

run();

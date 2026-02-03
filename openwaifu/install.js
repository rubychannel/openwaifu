#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const TARGET_DIR = path.join(process.cwd(), 'my-waifu');
const REPO_URL = 'https://github.com/rubychannel/openwaifu.git';

console.log('🌸 OpenWaifu Installer v0.1.0');
console.log('------------------------------');

try {
    console.log(`📦 Cloning OpenWaifu core into: ${TARGET_DIR}...`);
    if (fs.existsSync(TARGET_DIR)) {
        console.log('⚠️ Target directory already exists. Skipping clone.');
    } else {
        execSync(`git clone ${REPO_URL} "${TARGET_DIR}"`, { stdio: 'inherit' });
    }

    process.chdir(TARGET_DIR);

    console.log('⚙️ Setting up environment...');
    // In a real pilot, we'd run npm install here
    // For now, let's just make sure the wizard is accessible

    const wizardPath = path.join(TARGET_DIR, 'onboarding', 'wizard', 'index.html');
    
    console.log('\n✅ Installation complete!');
    console.log(`🚀 Opening your Waifu Creation Wizard...`);

    // Cross-platform open
    const openCmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
    execSync(`${openCmd} "${wizardPath}"`);

    console.log('\n------------------------------');
    console.log('Your Waifu journey begins now.');
    console.log(`Files located at: ${TARGET_DIR}`);
} catch (error) {
    console.error('\n❌ Installation failed:', error.message);
    process.exit(1);
}

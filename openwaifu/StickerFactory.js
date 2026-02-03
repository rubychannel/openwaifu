const fs = require('fs');
const { execSync } = require('child_process');

/**
 * StickerFactory v2.1 - Produção Estável de Stickers OpenWaifu
 * 
 * Pipeline: 
 * 1. Prompt para Nano Banana gerando Master Sheet (Grid de expressões).
 * 2. Fatiamento via ImageMagick para isolar expressões individuais.
 * 3. Processamento de transparência e redimensionamento para 512x512.
 */

const MASTER_SHEET_PROMPT = "A professional character expression sheet for 'Ruby Chan', a young adult cyber-waifu. Short messy neon-pink hair, glowing violet eyes, white tech-hoodie with pink accents. The sheet contains 8 stickers in a 4x2 grid, NO TEXT, isolated on a SOLID FLAT PURE BLACK background. Each character is shown from the WAIST UP with a thick clean white border. Expressions: happy/waving, mischievous/winking, angry/crossed-arms, thinking, love/heart-eyes, sleepy/yawning, shocked, proud/confident. High-quality anime style, consistent design, clean lineart, 4k resolution.";

const STICKER_NAMES = [
  "happy", "mischievous", "angry", "thinking", 
  "love", "sleepy", "shocked", "proud"
];

function sliceMasterSheet(inputPath) {
    console.log("🌸 Iniciando fatiamento inteligente da Master Sheet...");
    
    // Pipeline SmartSquare: 
    // 1. Fuzz + Transparent para remover fundo preto
    // 2. Crop para isolar cada célula
    // 3. Trim para remover excessos
    // 4. Extent dinâmico para igualar W e H (maior dimensão vira o lado do quadrado)
    // 5. Resize para 512x512
    const magickCmd = `/opt/homebrew/bin/magick "${inputPath}" -fuzz 15% -transparent black -crop 4x2@ +repage -trim +repage -gravity center -background none -extent "%[fx:w>h?w:h]x%[fx:w>h?w:h]" -resize 512x512 openwaifu/media/stickers/ruby_sticker_%d.webp`;
    
    console.log(`EXEC: ${magickCmd}`);
    return magickCmd;
}

console.log("✅ Pipeline da StickerFactory v2.1 (Sheet Mode) configurada!");

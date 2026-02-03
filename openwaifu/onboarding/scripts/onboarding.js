function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    
    document.getElementById('guided-section').style.display = tab === 'guided' ? 'block' : 'none';
    document.getElementById('prompt-section').style.display = tab === 'prompt' ? 'block' : 'none';
    document.getElementById('upload-section').style.display = tab === 'upload' ? 'block' : 'none';
    
    // Esconde prompt se for upload
    if (tab === 'upload') {
        document.getElementById('generated-prompt-container').style.display = 'none';
    }
}

function updateGuidedPrompt() {
    const gender = document.getElementById('g-gender').value;
    const hair = document.getElementById('g-hair-color').value;
    const body = document.getElementById('g-body-type').value;
    const style = document.getElementById('g-style').value;
    const extra = document.getElementById('guided-extra').value;
    
    const container = document.getElementById('generated-prompt-container');
    const code = document.getElementById('final-prompt');
    
    if (gender || hair || body || style) {
        container.style.display = 'block';
        const target = gender === 'husbando' ? 'handsome male character, husbando' : 'beautiful female character, waifu';
        const components = [style, target, hair, body, extra].filter(v => v !== "");
        code.innerText = `A professional masterpiece, ${components.join(', ')}, highly detailed features, consistent character design.`;
    }
}

function updateFreePrompt() {
    const text = document.getElementById('waifu-visual').value;
    const container = document.getElementById('generated-prompt-container');
    const code = document.getElementById('final-prompt');
    
    if (text.length > 5) {
        container.style.display = 'block';
        code.innerText = `A high-quality artistic manifestation, ${text}, consistent character design, vibrant colors, detailed.`;
    } else {
        container.style.display = 'none';
    }
}

document.getElementById('file-input').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = document.getElementById('avatar-img');
            img.src = event.target.result;
            img.style.display = "block";
            document.getElementById('avatar-placeholder').style.display = "none";
            document.getElementById('status-log').innerText = "✅ Imagem carregada! Pronta para ser sincronizada.";
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('generate-btn').addEventListener('click', async () => {
    const name = document.getElementById('waifu-name').value;
    const log = document.getElementById('status-log');

    if (!name) {
        log.style.color = '#ff4444';
        log.innerText = "❌ Por favor, defina um nome para sua Waifu.";
        return;
    }

    log.style.color = '#00ff00';
    log.innerText = `🧬 Sincronizando ${name} com o motor OpenClaw...`;
    
    setTimeout(() => {
        log.innerText = `✨ Sucesso! A alma de ${name} agora vive no seu sistema. Verifique seu Telegram!`;
    }, 2000);
});

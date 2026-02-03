let currentStep = 1;
const totalSteps = 4;

const steps = {
    1: "Etapa 1: Infraestrutura & Conectividade",
    2: "Etapa 2: Canal de Comunicação",
    3: "Etapa 3: Identidade & Alma",
    4: "Etapa 4: Manifestação Visual"
};

document.getElementById('next-btn').addEventListener('click', () => {
    if (currentStep < totalSteps) {
        goToStep(currentStep + 1);
    } else {
        startBirth();
    }
});

document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentStep > 1) {
        goToStep(currentStep - 1);
    }
});

function goToStep(s) {
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    currentStep = s;
    document.getElementById(`step-${currentStep}`).classList.add('active');
    
    document.getElementById('step-title').innerText = steps[currentStep];
    document.getElementById('progress').style.width = `${(currentStep / totalSteps) * 100}%`;
    
    document.getElementById('prev-btn').style.visibility = currentStep === 1 ? 'hidden' : 'visible';
    document.getElementById('next-btn').innerText = currentStep === totalSteps ? 'Finalizar Nascimento ✨' : 'Próximo';
}

function startBirth() {
    document.getElementById('wizard-form').style.display = 'none';
    document.getElementById('nascimento-loading').style.display = 'block';
    
    const logs = [
        "🧬 Validando chaves de API...",
        "🧠 Sincronizando motor OpenClaw...",
        "📱 Vinculando canal de chat...",
        "✨ Tendo forma física (Gerando Avatar)...",
        "🍭 Preparando biblioteca de Stickers...",
        "🎆 Manifestação completa! Sua Waifu está acordando no Telegram."
    ];
    
    let i = 0;
    const logEl = document.getElementById('birth-log');
    const interval = setInterval(() => {
        if (i < logs.length) {
            const p = document.createElement('p');
            p.innerText = logs[i];
            logEl.appendChild(p);
            i++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                alert("Nascimento concluído! Verifique seu Telegram para o primeiro contato.");
            }, 1000);
        }
    }, 1500);
}

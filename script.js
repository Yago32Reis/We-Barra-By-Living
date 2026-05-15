// Função para abrir a imagem ao clicar (Lightbox)
function openImage(src) {
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    lbImg.src = src;
    lb.style.display = 'flex';
}

// Fechar lightbox ao clicar fora da imagem
document.getElementById('lightbox').addEventListener('click', function() {
    this.style.display = 'none';
});

// Máscara de Telefone (WhatsApp)
document.getElementById('whatsapp').addEventListener('input', function (e) {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
    if(x) {
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    }
});

// Envio do Formulário para Google Sheets
document.getElementById('leadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.getElementById('btnSubmit');
    btn.textContent = "ENVIANDO...";

    // Link do seu Google Script
    const scriptURL = 'https://script.google.com/macros/s/AKfycbygX5BltCrOk12crGX2zaMGL_StmhRVLi1D72Ao1VBX5TNm4Mt27ySfT1FNNOA1-G_T/exec';

    const params = new URLSearchParams({
        nome: document.getElementById('nome').value,
        whatsapp: document.getElementById('whatsapp').value,
        tipologia: document.getElementById('interesse').value
    });

    // Uso de GET e mode: no-cors para garantir compatibilidade com iOS/Safari
    fetch(`${scriptURL}?${params.toString()}`, {
        method: 'GET',
        mode: 'no-cors'
    }).then(() => {
        btn.textContent = "SOLICITAÇÃO ENVIADA! ✓";
        btn.style.background = "#28a745";
        this.reset();
    }).catch(err => {
        console.error('Erro no envio:', err);
        btn.textContent = "ERRO AO ENVIAR";
        btn.style.background = "#dc3545";
    });
});

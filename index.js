const main = document.querySelector('main');
const root = document.querySelector(':root');
const input = document.getElementById('input');
const resultInput = document.getElementById('result');
const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]

// Adicionando funcionamento nos botões da tela

document.querySelectorAll('.charKey').forEach(function(charKeyBtn){
    charKeyBtn.addEventListener('click', function() {
        const value = charKeyBtn.dataset.value
        input.value += value
    });
});

// Adicionando a funcionalidade de clear e focus() para ao apagar ficar no input

document.getElementById('clear').addEventListener('click',function(){
    input.value = ' '
    input.focus()
});

// Previnir o comportamento podrão para que o usuario digite apenas os valores setados no array

input.addEventListener('keydown', function(ev) {
    ev.preventDefault() 
    if (allowedKeys.includes(ev.key)) {
        input.value += ev.key
        return
    }
    // Adicionando Backspace a função slice(0,-1) pega do caractere inicial que é a  posição 0 até a -1 que será o penultimo número
    if(ev.key === 'Backspace') {
        input.value = input.value.slice(0,-1)
    }
    if(ev.key === 'Enter') {
        calculate()
    }
});

// Adicioando a função eval() responsavel pela soma e trantando os erros

document.getElementById('equal').addEventListener('click', calculate)

function calculate() {
    resultInput.value ='ERROR'
    resultInput.classList.add('error');

    const result = eval(input.value);
    resultInput.value = result
    resultInput.classList.remove('error')
};

// Adicionando theme Dark ou light

document.getElementById('themeSwitcher').addEventListener('click', function() {
    if (main.dataset.theme === 'dark') {
        root.style.setProperty('--bg-color', '#f1f5f9');
        root.style.setProperty('--border-color', '#aaa');
        root.style.setProperty('--font-color', '#212529');
        root.style.setProperty('--primery-color', '#26834a');
        main.dataset.theme = 'light'
    } else {
        root.style.setProperty('--bg-color', '#212529');
        root.style.setProperty('--border-color', '#666');
        root.style.setProperty('--font-color', '#f1f5f9');
        root.style.setProperty('--primery-color', '#4dff91');
        main.dataset.theme = 'dark'
    }
});

// Adicionando uma função para copiar o resuldado 

document.getElementById('copyToClipboard').addEventListener('click', function(ev){
    const button = ev.currentTarget
    if(button.innerText === 'Copy') {
        button.innerText = 'Copied!'
        button.classList.add('success');
        navigator.clipboard.writeText(resultInput.value);
    } else {
        button.innerText ='Copy'
        button.classList.remeve('success')
    }
});
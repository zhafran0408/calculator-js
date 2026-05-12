lucide.createIcons();

let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetScreen = false;

const valueDisplay = document.getElementById('value');
const currentOpDisplay = document.getElementById('current-op');

function toggleTheme() {
    const body = document.body;
    const isDark = body.getAttribute('data-theme') === 'dark';
    if (isDark) {
        body.removeAttribute('data-theme');
    } else {
        body.setAttribute('data-theme', 'dark');
    }
}

// Logika kalkulator tetap sama
function appendNumber(num) {
    if (currentInput === '0' || shouldResetScreen) {
        currentInput = num;
        shouldResetScreen = false;
    } else {
        if (num === '.' && currentInput.includes('.')) return;
        currentInput += num;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operator !== null) calculate();
    previousInput = currentInput;
    operator = op;
    shouldResetScreen = true;
    currentOpDisplay.innerText = `${previousInput} ${getVisualOp(op)}`;
}

function calculate() {
    if (operator === null || shouldResetScreen) return;
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    switch (operator) {
        case '+': result = prev + curr; break;
        case '-': result = prev - curr; break;
        case '*': result = prev * curr; break;
        case '/': result = curr === 0 ? "Error" : prev / curr; break;
        default: return;
    }
    currentInput = result.toString();
    operator = null;
    currentOpDisplay.innerText = '';
    shouldResetScreen = true;
    updateDisplay();
}

function updateDisplay() {
    let val = currentInput;
    if (!isNaN(val)) {
        const parts = val.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        val = parts.join('.');
    }
    valueDisplay.innerText = val;
}

function getVisualOp(op) { return { '*': '×', '/': '÷', '+': '+', '-': '−' }[op] || op; }
function clearDisplay() { currentInput = '0'; previousInput = ''; operator = null; currentOpDisplay.innerText = ''; updateDisplay(); }
function deleteLast() { currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : '0'; updateDisplay(); }
function toggleSign() { currentInput = (parseFloat(currentInput) * -1).toString(); updateDisplay(); }
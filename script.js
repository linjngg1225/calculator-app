let display = document.getElementById('display');
let currentInput = '0';
let memoryValue = 0;

function updateDisplay() {
    display.textContent = currentInput;
}

function appendToDisplay(value) {
    if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else {
        currentInput += value;
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    updateDisplay();
}

function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function calculate() {
    try {
        currentInput = eval(currentInput).toString();
        updateDisplay();
    } catch (error) {
        currentInput = 'Error';
        updateDisplay();
        setTimeout(() => {
            currentInput = '0';
            updateDisplay();
        }, 1500);
    }
}
function calculatePercentage() {
    try {
        currentInput = (eval(currentInput) / 100).toString();
        updateDisplay();
    } catch (error) {
        currentInput = 'Error';
        updateDisplay();
        setTimeout(() => {
            currentInput = '0';
            updateDisplay();
        }, 1500);
    }
}
function memoryAdd() {
    try {
        const currentValue = eval(currentInput);
        memoryValue += currentValue;
        showMemoryIndicator();
    } catch (error) {
        console.error('Memory add error:', error);
    }
}

function memorySubtract() {
    try {
        const currentValue = eval(currentInput);
        memoryValue -= currentValue;
        showMemoryIndicator();
    } catch (error) {
        console.error('Memory subtract error:', error);
    }
}

function memoryRecall() {
    currentInput = memoryValue.toString();
    updateDisplay();
}

function memoryClear() {
    memoryValue = 0;
    hideMemoryIndicator();
}

function showMemoryIndicator() {
    display.style.borderLeft = '5px solid #ff9800';
}

function hideMemoryIndicator() {
    display.style.borderLeft = 'none';
}

function applyScientificOp() {
    const select = document.getElementById('scientificOp');
    const operation = select.value;
    if (!operation) return;

    try {
        const value = eval(currentInput);
        const operations = {
            sin: () => Math.sin(value * Math.PI / 180),
            cos: () => Math.cos(value * Math.PI / 180),
            tan: () => Math.tan(value * Math.PI / 180),
            log: () => Math.log10(value),
            sqrt: () => Math.sqrt(value),
            pow: () => Math.pow(value, 2)
        };
        currentInput = operations[operation]().toString();
        updateDisplay();
    } catch (error) {
        currentInput = 'Error';
        updateDisplay();
        setTimeout(clearDisplay, 1500);
    } finally {
        select.value = '';
    }
}

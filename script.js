const calc = {
    previousOperand: '',
    currentOperand: '',
    operator: null
};

let previousOperand = '';
let currentOperand = '';
let operator;

function clearAll() {
    calc.previousOperand = '';
    calc.currentOperand = '';
    calc.operator = null;
}

function deleteLastInput() {
    if (calc.previousOperand.includes('=')) {
        return;
    }

    calc.currentOperand = calc.currentOperand.toString().slice(0, -1);
}

function appendNumber(number) {
    if (number === '.' && calc.currentOperand.toString().includes('.')) {
        return;
    }

    if (calc.previousOperand.toString().includes('=')) {
        clearAll();
    }

    calc.currentOperand += number;
}

function chooseOperator(operation) {
    if (calc.currentOperand === '' || calc.currentOperand === Infinity) {
        return;
    }

    if (calc.previousOperand !== '') {
        compute();
    }

    calc.operator = operation;
    calc.previousOperand = calc.currentOperand;
    calc.currentOperand = '';
}

function compute() {
    let computation;
    const prev = parseFloat(calc.previousOperand);
    const current = parseFloat(calc.currentOperand);

    if ((isNaN(prev) || isNaN(current))) {
        return;
    }
    
    switch (calc.operator) {
        case '+':
            computation = prev + current;
            break;
        case '−':
            computation = prev - current;
            break;
        case '×':
            computation = prev * current;
            break;
        case '÷':
            computation = prev / current;
            break;
        default:
            return;
    }

    calc.previousOperand = `${getDisplayNumber(calc.previousOperand)} 
                            ${calc.operator} ${getDisplayNumber(calc.currentOperand)} =`;
    calc.currentOperand = computation;
    calc.operator = null;
}

const topHalfOutput = document.querySelector('#top-half');
const bottomHalfOutput = document.querySelector('#bottom-half');

function updateDisplay() {
    bottomHalfOutput.textContent = getDisplayNumber(calc.currentOperand);

    if (calc.operator != null) {
        topHalfOutput.textContent = `${getDisplayNumber(calc.previousOperand)} ${calc.operator}`;
    } 
    else {
        topHalfOutput.textContent = calc.previousOperand;
    }
}

function getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;

    if (stringNumber.includes('Infinity')) {
        return 'Math Error';
    }

    if (stringNumber.length > 7) {
        return parseFloat(stringNumber).toExponential(2);
    }

    if (isNaN(integerDigits)) {
        integerDisplay = '';
    } 
    else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 3 });
    }

    if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
    } 
    else {
        return integerDisplay;
    }
}

const clearButton = document.querySelector('#clear');

clearButton.addEventListener('click', () => {
    clearAll();
    updateDisplay();
});

const deleteButton = document.querySelector('#delete');

deleteButton.addEventListener('click', () => {
    deleteLastInput();
    updateDisplay();
});


const numbers = document.querySelectorAll('.number');

numbers.forEach(number => {
    number.addEventListener('click', () => {
        appendNumber(number.textContent);
        updateDisplay();
    });
});

const operators = document.querySelectorAll('.operator');

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        chooseOperator(operator.textContent);
        updateDisplay();
    });
});

const equalButton = document.querySelector('#equal');

equalButton.addEventListener('click', () => {
    compute();
    updateDisplay();
});

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
        case '.':
            appendNumber(event.key);
            updateDisplay();
            break;
        case '+':
            chooseOperator('+');
            updateDisplay();
            break;
        case '-':
            chooseOperator('−');
            updateDisplay();
            break;
        case '*':
            chooseOperator('×');
            updateDisplay();
            break;
        case '/':
            chooseOperator('÷');
            updateDisplay();
            break;
        case 'Enter':
            compute();
            updateDisplay();
            break;
        case 'Backspace':
            deleteLastInput();
            updateDisplay();
            break;
        case ' ':
            clearAll();
            updateDisplay();
            break;
    }
});
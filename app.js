document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttonsContainer = document.getElementById('buttons-container');
    const historyList = document.getElementById('history-list');
    const historySection = document.getElementById('history');

    let value = '';
    let history = [];

    function handleButtonClick(buttonValue) {
        if (buttonValue === 'AC') {
            value = '';
        } else if (buttonValue === 'DE') {
            value = value.slice(0, -1);
        } else if (buttonValue === '=') {
            try {
                const result = math.evaluate(value);
                history.push({ expression: value, result });
                updateHistoryUI();
                value = result.toString();
                
            } catch (error) {
                value = 'Error';
            }
        } else {
            value += buttonValue;
        }

        updateDisplayUI();
    }

    function updateDisplayUI() {
        display.value = value;
    }

    function updateHistoryUI() {
        historyList.innerHTML = '';
        history.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.expression} = ${item.result}`;
            historyList.appendChild(listItem);
        });
    }

    [
        ['AC', 'DE', '.', '/'],
        [7, 8, 9, '*'],
        [4, 5, 6, '+'],
        [1, 2, 3, '-'],
        ['00', 0, '=']
    ].forEach(row => {
        const rowContainer = document.createElement('div');
        rowContainer.classList.add('button-row');

        row.forEach(buttonValue => {
            const button = document.createElement('input');
            button.type = 'button';
            button.value = buttonValue;
            button.addEventListener('click', () => handleButtonClick(buttonValue));

            rowContainer.appendChild(button);
        });

        buttonsContainer.appendChild(rowContainer);
    });

    buttonsContainer.appendChild(historyButton)

function updateHistoryUI(historyData) {
    console.log(historyData);
}

function updateHistoryUI() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';

    history.forEach((item, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = `${item.expression} = ${item.result}`;
        button.addEventListener('click', () => handleHistoryButtonClick(item.expression));

        historyList.appendChild(button);
    });
}

buttonsContainer.appendChild(historyButton);


    const { addToHistory, getHistory, clearHistory } = require('./history');

// Example usage:
const expression = '2+2';
const result = 4;

// Add the calculation to history
addToHistory(expression, result);

// Get the entire history
const entireHistory = getHistory();
console.log('Entire History:', entireHistory);

// Clear the history
clearHistory();
console.log('History after clearing:', getHistory());
});

const symbols = ['+', '-', '*', '/']
const clearSymbols = ['c']
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, '=']

const symbolsElement = document.querySelector('.symbols')
const clearElement = document.querySelector('.clear')
const numbersElement = document.querySelector('.numbers')
const resultElement = document.querySelector('.result')
const tempResultElement = document.querySelector('.temp-result')
const tempSymbol = document.querySelector('.temp-symbol')

let isFirstCalculate = true

let symbolsButtonsHTML = ''
let clearButtonHTML = ''
let numbersButtonsHTML = ''

for (const symbol of symbols) {
    symbolsButtonsHTML += `<button class="btn" data-symbol="${symbol}" onclick="handleOnClick(this)">${symbol}</button>`
}

for (const clear of clearSymbols) {
    clearButtonHTML += `<button class="btn" data-number="${clear}" onclick="handleOnClick(this)">${clear}</button>`
}

for (const number of numbers) {
    numbersButtonsHTML += `<button class="btn" data-number="${number}" onclick="handleOnClick(this)">${number}</button>`
}

symbolsElement.innerHTML = symbolsButtonsHTML
numbersElement.innerHTML = numbersButtonsHTML
clearElement.innerHTML = clearButtonHTML


function handleOnClick(button) {
    if (button.dataset.symbol) {
        tempSymbol.textContent = button.dataset.symbol

        const calculatedResult = calculateTempResult(
            parseFloat(tempResultElement.textContent),
            parseFloat(resultElement.textContent),
            tempSymbol.textContent)

        if (!isNaN(Number(calculatedResult))) {
            tempResultElement.textContent = calculatedResult
            resultElement.textContent = 0
        } else {
            resultElement.textContent = calculatedResult
        }
    } else {
        if (button.dataset.number !== 'c' && button.dataset.number !== '=') {
            addResultContent(button.dataset.number)
        } else if (button.dataset.number === '=') {
            resultElement.textContent = calculateTempResult(
                parseFloat(tempResultElement.textContent),
                parseFloat(resultElement.textContent),
                tempSymbol.textContent)
            isFirstCalculate = true
        } else {
            resultElement.textContent = 0
            tempResultElement.textContent = 0
        }

    }
}

function addResultContent(num) {

    if (resultElement.textContent !== '0' && !isNaN(Number(resultElement.textContent))) {
        resultElement.textContent += num
    } else {
        resultElement.textContent = num
    }

}

function calculateTempResult(tempNumber, currentNumber, calculateSymbol) {

    if (isFirstCalculate) {
        isFirstCalculate = false
        return resultElement.textContent
    }

    switch (calculateSymbol) {
        case '+':
            return tempNumber + currentNumber;
        case '-':
            return tempNumber - currentNumber;
        case '*':
            return tempNumber * currentNumber;
        case '/':
            if (currentNumber === 0) {
                return 'Делить на ноль нельзя';
            }
            return tempNumber / currentNumber;
        default:
            return 0;
    }
}

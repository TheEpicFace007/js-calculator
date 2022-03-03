"use strict";
const result = document.getElementById('result');
const stats = document.getElementById('num-calc');

stats.innerText = `${localStorage.numCalc ?? 0} equation computed 💻🧮`

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', function () {
        const operators = [['add', '+'], ['substract', '-'], ['multiply', '*'],
            ['divide', '/']];
        const operator = operators.find(x => x[0] === button.id);
        result.style.color = 'black';
        if (button.id == 'clear') {
            result.value = '';
        } else if (button.id === 'equals') {
;

            try {
                result.value += `= ${eval(result.value)}`;

                let numCalc = localStorage.getItem('numCalc')
                if (numCalc) {
                    numCalc = parseInt(numCalc);
                } else {
                    numCalc = 0;
                }

                numCalc++;
                localStorage.setItem('numCalc', numCalc);
            } catch (e) {
                if (e instanceof SyntaxError) {
                    result.value = 'Syntax Error';
                    result.style.color = 'red';
                }
            }
            stats.innerText = `${numCalc} equation computed 💻🧮`;
        } else {
            result.value += button.innerText;
        }
    });
});
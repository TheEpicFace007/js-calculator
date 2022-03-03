"use strict";
const result = document.getElementById('result');
const stats = document.getElementById('num-calc');

stats.innerText = `${localStorage.numCalc || 0} equation computed 💻🧮`

document.querySelectorAll('.calc-btn').forEach(button => {
    button.addEventListener('click', function () {
        const operators = [['add', '+'], ['substract', '-'], ['multiply', '*', '×'],
            ['divide', '/', '÷']];
        const operator = operators.find(x => x[0] === button.id);
        result.style.color = 'black';
        if (button.id == 'clear') {
            result.value = '';
        } else if (button.id === 'equals') {
;

            try {
                result.value += `= ${eval(result.value.replaceAll('×', '*').replaceAll('÷', '/'))}`;

                let numCalc = localStorage.getItem('numCalc')
                if (numCalc) {
                    numCalc = parseInt(numCalc);
                } else {
                    numCalc = 0;
                }

                numCalc++;
                localStorage.setItem('numCalc', numCalc);
                stats.innerText = `${numCalc} equation computed 💻🧮`;
            } catch (e) {
                if (e instanceof SyntaxError) {
                    result.value = 'Syntax Error';
                    result.style.color = 'red';
                }
                console.error(e);
            }
            let logs = localStorage.getItem('logs');
            logs = logs ? JSON.parse(logs) : [];
            logs.push({ calculation: result.value, date: new Date() });
            localStorage.setItem('logs', JSON.stringify(logs));

        } else {
            result.value += button.innerText;
        }
    });
});

document.getElementById('save-history').addEventListener('click', function () {
    // open a save as dialog
    let logs = JSON.parse(localStorage.logs) ?? [];
    logs = logs.map(x => {
        return {
            calculation: x.calculation,
            date: new Date(x.date)
        }
    });
    let logsTxt = '';
    logs.forEach(log => {
        logsTxt += `${log.date.toLocaleString('en-ca')} - ${log.calculation}\n`;
    });
    const blob = new Blob([logsTxt], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'calculator-history.txt';
    link.click();
});
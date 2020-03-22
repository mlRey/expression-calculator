
function expressionCalculator(expr) {

    expr = expr.replace(/\s/g, '').replace(/(\*|\/|\+|\-)/g, ' $& ');
    let ob = expr.split('(').length - 1;
    let cb = expr.split(')').length - 1;
    let brexp;
    if (ob != cb) throw new Error("ExpressionError: Brackets must be paired.");
    while (ob > 0) {
        if ((brexp = expr.match(/(\([0-9\+\/\*\-. ]+\))/g)) !== null) {
            for (let i = 0; i < brexp.length; i++) {
                let str = brexp[i].replace('(', '').replace(')', '');
                expr = expr.replace(brexp[i], solve(str));
            }
        }
        ob -= 1;
    }
    return (solve(expr));
}

function solve(expr) {
    let tmp = expr.split(' ');
    for (let i = 0; i < tmp.length; i++) {
        if (tmp[i] === '*') {
            tmp[i] = Number(tmp[i - 1]) * Number(tmp[i + 1]);
            tmp.splice(i - 1, 1);
            tmp.splice(i, 1);
            i -= 1;
        }
        if (tmp[i] === "/") {
            if (tmp[i + 1] === '0') throw new TypeError('TypeError: Division by zero.');
            tmp[i] = Number(tmp[i - 1]) / Number(tmp[i + 1]);
            tmp.splice(i - 1, 1);
            tmp.splice(i, 1);
            i -= 1;
        }
    }
    for (let i = 0; i < tmp.length; i++) {
        if (tmp[i] === '+') {
            tmp[i] = Number(tmp[i - 1]) + Number(tmp[i + 1]);
            tmp.splice(i - 1, 1);
            tmp.splice(i, 1);
            i -= 1;
        }
        if (tmp[i] === "-") {
            tmp[i] = Number(tmp[i - 1]) - Number(tmp[i + 1]);
            tmp.splice(i - 1, 1);
            tmp.splice(i, 1);
            i -= 1;
        }
    }
    return Number(tmp[0]);
}

module.exports = {
    expressionCalculator
}
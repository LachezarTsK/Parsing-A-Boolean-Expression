
/**
 * @param {string} expression
 * @return {boolean}
 */
var parseBoolExpr = function (expression) {
    this.TRUE = 't';
    this.FALSE = 'f';

    this.trueFound = false;
    this.falseFound = false;
    this.result = false;

    const stack = new Array();

    for (let current of expression) {
        if (current === ',') {
            continue;
        }

        if (current !== ')') {
            stack.push(current);
            continue;
        }

        processExpressionInBrackets(stack);
        if (stack.length === 0) {
            this.result = this.trueFound;
            break;
        }

        proccessBooleanOperator(stack);
        resetFoundBooleanValues();

        const next = this.result ? this.TRUE : this.FALSE;
        stack.push(next);
    }

    return this.result;
};

/**
 * @param {string[]} stack
 * @return {void}
 */
function processExpressionInBrackets(stack) {
    while (stack.length !== 0) {
        const ch = stack.pop();

        if (ch === this.TRUE) {
            this.trueFound = true;
        } else if (ch === this.FALSE) {
            this.falseFound = true;
        } else if (ch === '(') {
            break;
        }
    }
}

/**
 * @param {string[]} stack
 * @return {void}
 */
function proccessBooleanOperator(stack) {
    const booleanOperator = stack.pop();
    if (booleanOperator === '!') {
        this.result = !this.trueFound;
    } else if (booleanOperator === '|') {
        this.result = this.trueFound;
    } else if (booleanOperator === '&') {
        this.result = !this.falseFound;
    }
}

/**
 * @return {void}
 */
function resetFoundBooleanValues() {
    this.trueFound = false;
    this.falseFound = false;
}


function parseBoolExpr(expression: string): boolean {
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

function processExpressionInBrackets(stack: string[]) {
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

function proccessBooleanOperator(stack: string[]) {
    const booleanOperator = stack.pop();
    if (booleanOperator === '!') {
        this.result = !this.trueFound;
    } else if (booleanOperator === '|') {
        this.result = this.trueFound;
    } else if (booleanOperator === '&') {
        this.result = !this.falseFound;
    }
}

function resetFoundBooleanValues() {
    this.trueFound = false;
    this.falseFound = false;
}

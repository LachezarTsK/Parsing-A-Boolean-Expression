
class Solution {

    private companion object {
        const val TRUE = 't'
        const val FALSE = 'f'
    }

    private var trueFound = false
    private var falseFound = false
    private var result = false

    fun parseBoolExpr(expression: String): Boolean {
        val stack = ArrayDeque<Char>()

        for (current in expression) {
            if (current == ',') {
                continue
            }

            if (current != ')') {
                stack.push(current)
                continue
            }

            processExpressionInBrackets(stack)
            if (stack.isEmpty()) {
                result = trueFound
                break
            }

            proccessBooleanOperator(stack)
            resetFoundBooleanValues()

            val next = if (result) TRUE else FALSE
            stack.push(next)
        }

        return result
    }

    private fun processExpressionInBrackets(stack: ArrayDeque<Char>) {
        while (!stack.isEmpty()) {
            val current = stack.pop()
            if (current == TRUE) {
                trueFound = true
            } else if (current == FALSE) {
                falseFound = true
            } else if (current == '(') {
                break
            }
        }
    }

    private fun proccessBooleanOperator(stack: ArrayDeque<Char>) {
        val booleanOperator = stack.pop()
        if (booleanOperator == '!') {
            result = !trueFound
        } else if (booleanOperator == '|') {
            result = trueFound
        } else if (booleanOperator == '&') {
            result = !falseFound
        }
    }

    private fun resetFoundBooleanValues() {
        trueFound = false
        falseFound = false
    }
}

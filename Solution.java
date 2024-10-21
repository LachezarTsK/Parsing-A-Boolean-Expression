
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {

    private static final char TRUE = 't';
    private static final char FALSE = 'f';

    private boolean trueFound;
    private boolean falseFound;
    private boolean result;

    public boolean parseBoolExpr(String expression) {

        Deque<Character> stack = new ArrayDeque<>();

        for (char current : expression.toCharArray()) {
            if (current == ',') {
                continue;
            }

            if (current != ')') {
                stack.push(current);
                continue;
            }

            processExpressionInBrackets(stack);
            if (stack.isEmpty()) {
                result = trueFound;
                break;
            }

            proccessBooleanOperator(stack);
            resetFoundBooleanValues();

            char next = result ? TRUE : FALSE;
            stack.push(next);
        }

        return result;
    }

    private void processExpressionInBrackets(Deque<Character> stack) {
        while (!stack.isEmpty()) {
            char current = stack.pop();
            if (current == TRUE) {
                trueFound = true;
            } else if (current == FALSE) {
                falseFound = true;
            } else if (current == '(') {
                break;
            }
        }
    }

    private void proccessBooleanOperator(Deque<Character> stack) {
        char booleanOperator = stack.pop();
        if (booleanOperator == '!') {
            result = !trueFound;
        } else if (booleanOperator == '|') {
            result = trueFound;
        } else if (booleanOperator == '&') {
            result = !falseFound;
        }
    }

    private void resetFoundBooleanValues() {
        trueFound = false;
        falseFound = false;
    }
}


#include <deque>
#include <string>
using namespace std;

/*
The code will run faster with ios::sync_with_stdio(0).
However, this should not be used in production code and interactive problems.
In this particular problem, it is ok to apply ios::sync_with_stdio(0).

Many of the top-ranked C++ solutions for time on leetcode apply this trick,
so, for a fairer assessment of the time percentile of my code
you could outcomment the lambda expression below for a faster run.
*/

/*
const static auto speedup = [] {
    ios::sync_with_stdio(0);
    return nullptr;
}();
*/

class Solution {

    static const char TRUE = 't';
    static const char FALSE = 'f';

    bool trueFound = false;
    bool falseFound = false;
    bool result = false;

public:
    bool parseBoolExpr(const string& expression) {
        deque<char> stack;

        for (const auto& current : expression) {
            if (current == ',') {
                continue;
            }

            if (current != ')') {
                stack.push_front(current);
                continue;
            }

            processExpressionInBrackets(stack);
            if (stack.empty()) {
                result = trueFound;
                break;
            }

            proccessBooleanOperator(stack);
            resetFoundBooleanValues();

            char next = result ? TRUE : FALSE;
            stack.push_front(next);
        }

        return result;
    }

private:
    void processExpressionInBrackets(deque<char>& stack) {
        while (!stack.empty()) {
            char current = stack.front();
            stack.pop_front();
            if (current == TRUE) {
                trueFound = true;
            }
            else if (current == FALSE) {
                falseFound = true;
            }
            else if (current == '(') {
                break;
            }
        }
    }

    void proccessBooleanOperator(deque<char>& stack) {
        char booleanOperator = stack.front();
        stack.pop_front();
        if (booleanOperator == '!') {
            result = !trueFound;
        }
        else if (booleanOperator == '|') {
            result = trueFound;
        }
        else if (booleanOperator == '&') {
            result = !falseFound;
        }
    }

    void resetFoundBooleanValues() {
        trueFound = false;
        falseFound = false;
    }
};

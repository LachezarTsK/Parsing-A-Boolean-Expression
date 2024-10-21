
package main

import "fmt"

const TRUE byte = 't'
const FALSE byte = 'f'

var trueFound = false
var falseFound = false
var result = false

func parseBoolExpr(expression string) bool {
    var stack *[]byte = &[]byte{}
    for i := range expression {
        current := expression[i]
        if current == ',' {
            continue
        }

        if current != ')' {
            *stack = append(*stack, current)
            continue
        }

        processExpressionInBrackets(stack)
        if len(*stack) == 0 {
            result = trueFound
            break
        }

        proccessBooleanOperator(stack)
        resetFoundBooleanValues()

        next := Ternary(result, TRUE, FALSE)
        *stack = append(*stack, next)
    }

    return result
}

func processExpressionInBrackets(stack *[]byte) {
    for len(*stack) > 0 {
        current := (*stack)[len(*stack) - 1]
        *stack = (*stack)[0 : len(*stack) - 1]

        if current == TRUE {
            trueFound = true
        } else if current == FALSE {
            falseFound = true
        } else if current == '(' {
            break
        }
    }
}

func proccessBooleanOperator(stack *[]byte) {
    booleanOperator := (*stack)[len(*stack) - 1]
    *stack = (*stack)[0 : len(*stack) - 1]

    if booleanOperator == '!' {
        result = !trueFound
    } else if booleanOperator == '|' {
        result = trueFound
    } else if booleanOperator == '&' {
        result = !falseFound
    }
}

func resetFoundBooleanValues() {
    trueFound = false
    falseFound = false
}

func Ternary[T any](condition bool, first T, second T) T {
    if condition {
        return first
    }
    return second
}

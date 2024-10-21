
using System;
using System.Collections.Generic;

public class Solution
{
    private static readonly char TRUE = 't';
    private static readonly char FALSE = 'f';

    private bool trueFound;
    private bool falseFound;
    private bool result;

    public bool ParseBoolExpr(string expression)
    {
        Stack<char> stack = new Stack<char>();

        foreach (char current in expression)
        {
            if (current == ',')
            {
                continue;
            }

            if (current != ')')
            {
                stack.Push(current);
                continue;
            }

            ProcessExpressionInBrackets(stack);
            if (stack.Count == 0)
            {
                result = trueFound;
                break;
            }

            ProccessBooleanOperator(stack);
            ResetFoundBooleanValues();

            char next = result ? TRUE : FALSE;
            stack.Push(next);
        }

        return result;
    }

    private void ProcessExpressionInBrackets(Stack<char> stack)
    {
        while (stack.Count > 0)
        {
            char current = stack.Pop();
            if (current == TRUE)
            {
                trueFound = true;
            }
            else if (current == FALSE)
            {
                falseFound = true;
            }
            else if (current == '(')
            {
                break;
            }
        }
    }

    private void ProccessBooleanOperator(Stack<char> stack)
    {
        char booleanOperator = stack.Pop();
        if (booleanOperator == '!')
        {
            result = !trueFound;
        }
        else if (booleanOperator == '|')
        {
            result = trueFound;
        }
        else if (booleanOperator == '&')
        {
            result = !falseFound;
        }
    }

    private void ResetFoundBooleanValues()
    {
        trueFound = false;
        falseFound = false;
    }
}

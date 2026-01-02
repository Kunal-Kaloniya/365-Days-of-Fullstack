import java.util.HashMap;
import java.util.Stack;

class ValidParentheses {

    static boolean isValidParentheses(String s) {
        HashMap<Character, Character> brackets = new HashMap<>();
        Stack<Character> stk = new Stack<>();

        brackets.put('(', ')');
        brackets.put('{', '}');
        brackets.put('[', ']');

        for (int i = 0; i < s.length(); i++) {
            char currChar = s.charAt(i);

            if (brackets.containsKey(currChar)) {
                stk.push(currChar);
            } else {
                if (stk.isEmpty()) {
                    return false;
                }

                char top = stk.pop();
                if (brackets.get(top) != currChar) {
                    return false;
                }
            }
        }

        return stk.isEmpty();
    }

    public static void main(String[] args) {
        String s1 = "()[]{}";
        String s2 = "(]";
        String s3 = "([)]";

        boolean result = isValidParentheses(s3);
        System.out.println(result);
    }
}

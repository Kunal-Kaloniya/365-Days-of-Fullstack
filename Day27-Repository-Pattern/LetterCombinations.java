class LetterCombinations {
    private List<String> result = new ArrayList<>();
    private Map<Character, String> map = Map.of(
        '2', "abc", '3', "def", '4', "ghi", '5', "jkl", '6', "mno", '7', "pqrs", '8', "tuv", '9', "wxyz"
    );

    private void backtrack(int index, StringBuilder path, String digits) {
        if (path.length() == digits.length()) {
            result.add(path.toString());
            return;
        }

        String letters = map.get(digits.charAt(index));
        for (char letter : letters.toCharArray()) {
            path.append(letter);
            backtrack(index + 1, path, digits);
            path.deleteCharAt(path.length() - 1);
        }
    }

    public List<String> letterCombinations(String digits) {
        backtrack(0, new StringBuilder(), digits);
        return result;
    }
}
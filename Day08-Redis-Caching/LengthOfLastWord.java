class LengthOfLastWord {
    public int lengthOfLastWord(String s) {
        int finalLength = 0;
        boolean isWordStarted = false;

        for (int i = s.length() - 1; i >= 0; i--) {
            if (!isWordStarted && s.charAt(i) == ' ') {
                continue;
            } else if (isWordStarted && s.charAt(i) == ' ') {
                break;
            } else if (!isWordStarted && s.charAt(i) != ' ') {
                isWordStarted = true;
                finalLength++;
            } else {
                finalLength++;
            }
        }

        return finalLength;
    }
}
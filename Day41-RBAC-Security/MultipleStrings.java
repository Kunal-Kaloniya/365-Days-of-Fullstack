class MultipleStrings {
    public String multiply(String num1, String num2) {
        if (num1.equals("0") || num2.equals("0")) {
            return "0";
        }

        int m = num1.length();
        int n = num2.length();
        int[] position = new int[m + n];

        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                int mul = (num1.charAt(i) - '0') * (num2.charAt(j) - '0');

                int p1 = i + j;
                int p2 = i + j + 1;
                int sum = mul + position[p2];

                position[p2] = sum % 10;
                position[p1] += sum / 10;
            }
        }

        StringBuilder result = new StringBuilder();
        for (int p : position) {
            if (!(result.length() == 0 && p == 0)) {
                result.append(p);
            }
        }

        return result.toString();
    }
}
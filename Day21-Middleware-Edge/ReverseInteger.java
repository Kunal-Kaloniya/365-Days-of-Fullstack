class ReverseInteger {
    public int reverse(int x) {
        long result = 0;

        while (x != 0) {
            int digit = x % 10;
            x = x / 10;

            result = (result * 10) + digit;
        }

        if (result > 2147483647 || result < -2147483648) {
            return 0;
        }

        return (int) result;
    }
}
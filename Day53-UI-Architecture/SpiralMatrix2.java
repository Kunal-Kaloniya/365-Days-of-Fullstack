class SpiralMatrix2 {
    public int[][] generateMatrix(int n) {
        int[][] result = new int[n][n];

        int top = 0;
        int right = n - 1;
        int left = 0;
        int bottom = n - 1;

        int count = 1;
        while (count <= n * n) {
            for (int i = left; i <= right; i++) {
                result[top][i] = count++;
            }
            top++;

            for (int i = top; i <= bottom; i++) {
                result[i][right] = count++;
            }
            right--;

            for (int i = right; i >= left; i--) {
                result[bottom][i] = count++;
            }
            bottom--;

            for (int i = bottom; i >= top; i--) {
                result[i][left] = count++;
            }
            left++;
        }

        return result;
    }
}
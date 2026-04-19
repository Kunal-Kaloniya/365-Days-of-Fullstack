class PalindromePartitioning2 {
    public int minCut(String s) {
        int n = s.length();
        if (n <= 1) return 0;

        boolean[][] isPal = new boolean[n][n];
        for (int len = 1; len <= n; len++) {
            for (int i = 0; i <= n - len; i++) {
                int j = i + len - 1;
                if (s.charAt(i) == s.charAt(j)) {
                    isPal[i][j] = (len <= 2) || isPal[i + 1][j - 1];
                }
            }
        }

        int[] cuts = new int[n];
        for (int i = 0; i < n; i++) {
            int minCuts = i;
            
            for (int j = 0; j <= i; j++) {
                if (isPal[j][i]) {
                    if (j == 0) {
                        minCuts = 0;
                    } else {
                        minCuts = Math.min(minCuts, cuts[j - 1] + 1);
                    }
                }
            }
            cuts[i] = minCuts;
        }

        return cuts[n - 1];
    }
}
class UniqueBinarySearchTrees {
    public int numTrees(int n) {
        int[] dp = new int[n + 1];
        dp[0] = 1;
        dp[1] = 1;

        for (int totalNodes = 2; totalNodes <= n; totalNodes++) {
            for (int rootPos = 1; rootPos <= totalNodes; rootPos++) {
                dp[totalNodes] += dp[rootPos - 1] * dp[totalNodes - rootPos];
            }
        }

        return dp[n];
    }
}
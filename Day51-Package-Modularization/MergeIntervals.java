class MergeIntervals {
    public int[][] merge(int[][] intervals) {
        if (intervals.length <= 1) return intervals;

        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        List<int[]> result = new ArrayList<>();
        int[] currInterval = intervals[0];
        result.add(currInterval);

        for (int[] nextInterval : intervals) {
            int currEnd = currInterval[1];
            int nextStart = nextInterval[0];
            int nextEnd = nextInterval[1];

            if (nextStart <= currEnd) {
                currInterval[1] = Math.max(currEnd, nextEnd);
            } else {
                currInterval = nextInterval;
                result.add(currInterval);
            }
        }

        return result.toArray(new int[result.size()][]);
    }
}
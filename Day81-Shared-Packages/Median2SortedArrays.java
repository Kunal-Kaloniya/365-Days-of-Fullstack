class Median2SortedArrays {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if (nums1.length > nums2.length) {
            return findMedianSortedArrays(nums2, nums1);
        }

        int m = nums1.length;
        int n = nums2.length;
        int left = 0, right = m;

        while (left <= right) {
            int partitionX = (left + right) / 2;
            int partitionY = (m + n + 1) / 2 - partitionX;

            int L1 = (partitionX == 0) ? Integer.MIN_VALUE : nums1[partitionX - 1];
            int R1 = (partitionX == m) ? Integer.MAX_VALUE : nums1[partitionX];
            int L2 = (partitionY == 0) ? Integer.MIN_VALUE : nums2[partitionY - 1];
            int R2 = (partitionY == n) ? Integer.MAX_VALUE : nums2[partitionY];

            if (L1 <= R2 && L2 <= R1) {
                if ((m + n) % 2 == 0) {
                    return (Math.max(L1, L2) + Math.min(R1, R2)) / 2.0;
                } else {
                    return Math.max(L1, L2);
                }
            } else if (L1 > R2) {
                right = partitionX - 1;
            } else {
                left = partitionX + 1;
            }
        }

        throw new IllegalArgumentException("Input arrays are not sorted");
    }
}
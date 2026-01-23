class ContainerWithMostWater {
    public int maxArea(int[] height) {
        int maxAmount = 0;
        int left = 0;
        int right = height.length - 1;

        while (left <= right) {
            int currAmount = (right - left) * Math.min(height[left], height[right]);
            if (currAmount > maxAmount) {
                maxAmount = currAmount;
            }

            if (height[left] <= height[right]) {
                left++;
            } else {
                right--;
            }
        }

        return maxAmount;
    }
}
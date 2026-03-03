class SortColors {

    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

    public void sortColors(int[] nums) {
        int low = 0;
        int curr = 0;
        int high = nums.length - 1;

        while (curr <= high) {
            if (nums[curr] == 0) {
                swap(nums, curr, low);
                low++;
                curr++;
            } else if (nums[curr] == 2) {
                swap(nums, curr, high);
                high--;
            } else {
                curr++;
            }
        }
    }
}
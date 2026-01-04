class RemoveDuplicates {
    public int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;

        int slow = 0;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] != nums[slow]) {
                slow++;
                nums[slow] = nums[i];
            }
        }

        return slow + 1;
    }
}
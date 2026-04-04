/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class PathSum2 {
    public List<List<Integer>> pathSum(TreeNode root, int targetSum) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(root, targetSum, new ArrayList<>(), result);
        return result;
    }

    private void backtrack(TreeNode node, int targetSum, List<Integer> currentPath, List<List<Integer>> result) {
        if (node == null) return;

        currentPath.add(node.val);

        if (node.left == null && node.right == null && targetSum == node.val) {
            result.add(new ArrayList<>(currentPath));
        } else {
            backtrack(node.left, targetSum - node.val, currentPath, result);
            backtrack(node.right, targetSum - node.val, currentPath, result);
        }

        currentPath.remove(currentPath.size() - 1);
    }
}
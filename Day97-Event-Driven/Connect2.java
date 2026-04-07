/*
// Definition for a Node.
class Node {
    public int val;
    public Node left;
    public Node right;
    public Node next;

    public Node() {}
    
    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, Node _left, Node _right, Node _next) {
        val = _val;
        left = _left;
        right = _right;
        next = _next;
    }
};
*/

class Connect2 {
    public Node connect(Node root) {
        Node curr = root;
        
        while (curr != null) {
            Node dummy = new Node(0);
            Node temp = dummy;
            
            while (curr != null) {
                if (curr.left != null) {
                    temp.next = curr.left;
                    temp = temp.next;
                }
                if (curr.right != null) {
                    temp.next = curr.right;
                    temp = temp.next;
                }
                curr = curr.next;
            }
            
            curr = dummy.next;
        }
        
        return root;
    }
}
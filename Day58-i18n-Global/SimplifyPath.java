class SimplifyPath {
    public String simplifyPath(String path) {
        Deque<String> stack = new LinkedList<>();
        String[] components = path.split("/");

        for (String directory: components) {
            if (directory.equals(".") || directory.isEmpty()) {
                continue;
            } else if (directory.equals("..")) {
                if (!stack.isEmpty()) {
                    stack.pop();
                }
            } else {
                stack.push(directory);
            }
        }

        StringBuilder result = new StringBuilder();
        Iterator<String> it = stack.descendingIterator();
        while (it.hasNext()) {
            result.append('/').append(it.next());
        }

        return result.length() == 0 ? "/" : result.toString();
    }
}
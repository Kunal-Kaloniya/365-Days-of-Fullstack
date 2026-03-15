class RestoreIpAddresses {
    private void backtrack(List<String> result, String s, int start, List<String> current) {
        if (current.size() == 4) {
            if (start == s.length()) {
                result.add(String.join(".", current));
            }
            return;
        }

        for (int len = 1; len <= 3; len++) {
            if (start + len > s.length()) break;

            String segment = s.substring(start, start + len);
            if (segment.startsWith("0") && len > 1) continue;
            if (len == 3 && Integer.parseInt(segment) > 255) continue;

            current.add(segment);
            backtrack(result, s, start + len, current);
            current.remove(current.size() - 1);
        }
    }

    public List<String> restoreIpAddresses(String s) {
        List<String> result = new ArrayList<>();
        if (s.length() < 4 || s.length() > 12) return result;
        backtrack(result, s, 0, new ArrayList<>());
        return result;
    }
}
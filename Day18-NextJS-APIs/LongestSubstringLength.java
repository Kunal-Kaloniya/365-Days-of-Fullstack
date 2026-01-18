import java.util.HashMap;

class LongestSubstringLength {
    public int lengthOfLongestSubstring(String s) {
        int n = s.length();
        int maxLen = 0;
        HashMap<Character, Integer> map = new HashMap<>();
        
        for (int left = 0, right = 0; right < n; right++) {
            char currChar = s.charAt(right);

            if (map.containsKey(currChar)) {
                left = Math.max(left, map.get(currChar) + 1);
            }

            map.put(currChar, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
    }
}
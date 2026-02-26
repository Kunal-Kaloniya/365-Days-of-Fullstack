// === The Accessibility Tree & ARIA ====
// When a screen render (used by visually impaired users) visits your site, it doesn't "see" your CSS. It reads the Accessibility Tree.
// 
// === Semantic Foundations ===
// 1. Semantic HTML: Using tags like <main>, <nav>, <article>, and <section> to give the page structure.
// 2. Keyboard Navigatibility: Ensuring every interactive element (links, buttons, inputs) can be reahed and triggered using only the Tab and Enter keys.
// 3. ARIA (Accessible Rich Internet Applications): Attributes like aria-label or aria-expanded that describe the state of complex components (like mobile menus or accordions) to assistive technology.
// 4. Focus Management: When a modal opens, the "focus" should move inside the modal and be "trapped" there until it's closed.


// MICROLAB
// Audit your main Navigation or a Modal component. Replace non-semantic tags and add focus trap "trapped" there until it's closed.
// ❌ BAD: Not accessible via keyboard, no role
<div onClick={submit} className="bg-blue-500">Submit</div>

// ✅ GOOD: Semantic, focusable, screen-reader friendly
<button 
  type="submit"
  aria-label="Submit your profile information"
  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
  onKeyDown={(e) => e.key === 'Enter' && submit()}
>
  Submit
</button>
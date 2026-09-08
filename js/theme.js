/* theme.js — manual light/dark toggle.
 *
 * Light is the default; prefers-color-scheme is deliberately ignored. The stored
 * choice is applied by a tiny inline script in <head> before first paint, so this
 * file only has to wire the button and keep meta[theme-color] in step.
 * `?theme=dark` in the URL forces a theme for screenshots (and is not persisted).
 */
(function () {
  var KEY = "spatics-theme";

  var btn = document.getElementById("theme-toggle");
  var meta = document.querySelector('meta[name="theme-color"]');

  function current() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function apply(theme, persist) {
    if (theme === "dark") document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.removeAttribute("data-theme");

    // read the ground back out of the live tokens, so editing --khadi in
    // tokens.css cannot desynchronise the browser chrome from the page
    if (meta) {
      meta.setAttribute(
        "content",
        getComputedStyle(document.documentElement).getPropertyValue("--khadi").trim()
      );
    }
    if (btn) {
      btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }
    if (persist) {
      try { localStorage.setItem(KEY, theme); } catch (e) {}
    }
  }

  // URL override wins over storage, for headless screenshots.
  var forced = new URLSearchParams(location.search).get("theme");
  apply(forced === "dark" || forced === "light" ? forced : current(), false);

  if (btn) {
    btn.addEventListener("click", function () {
      apply(current() === "dark" ? "light" : "dark", true);
    });
  }
})();

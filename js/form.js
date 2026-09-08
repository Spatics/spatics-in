/* form.js — access request submission.
 *
 * POSTs FormData (email, domain, source) to CONFIG.FORM_ENDPOINT. Web3Forms wants
 * an `access_key` field; Formspree ignores it, so one code path serves both.
 * With no endpoint configured the page still completes: it warns in the console
 * and shows the success state, so it never looks broken before launch.
 */
(function () {
  var cfg = window.CONFIG || {};
  var form = document.getElementById("access-form");
  var done = document.getElementById("access-done");
  var err = document.getElementById("access-error");
  var btn = document.getElementById("submit-btn");
  if (!form || !done || !err || !btn) return;

  var inFlight = false;

  // The button stays focusable and in the reading order while it works: a real
  // `disabled` would drop focus to <body> mid-submit and hide the "Sending…"
  // label from browse mode. aria-disabled + a JS guard does the same job.
  function lock() {
    inFlight = true;
    btn.setAttribute("aria-disabled", "true");
    btn.textContent = "Sending…";
  }

  function unlock() {
    inFlight = false;
    btn.removeAttribute("aria-disabled");
    btn.textContent = "Request Access";
  }

  function clearError() {
    while (err.firstChild) err.removeChild(err.firstChild);
  }

  function succeed() {
    clearError();
    form.hidden = true;
    done.hidden = false;
  }

  // #access-error is always in the DOM and never `hidden`: role="alert" only
  // announces changes made inside a region that is already rendered. Writing
  // into it is therefore the whole job.
  function fail() {
    unlock();
    clearError();
    err.appendChild(document.createTextNode("Could not send. Email us instead."));
    if (cfg.FALLBACK_EMAIL) {
      var a = document.createElement("a");
      a.href = "mailto:" + cfg.FALLBACK_EMAIL;
      a.textContent = cfg.FALLBACK_EMAIL;
      err.appendChild(document.createTextNode(" "));
      err.appendChild(a);
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (inFlight) return;
    clearError();

    var data = new FormData();
    data.append("email", form.elements.email.value.trim());
    data.append("domain", form.elements.domain.value);
    data.append("source", "spatics.in");
    if (cfg.FORM_ACCESS_KEY) data.append("access_key", cfg.FORM_ACCESS_KEY);

    if (!cfg.FORM_ENDPOINT) {
      console.warn("[spatics] CONFIG.FORM_ENDPOINT is empty — request not sent. Set it in js/config.js.");
      succeed();
      return;
    }

    lock();

    fetch(cfg.FORM_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } })
      .then(function (r) {
        // Web3Forms answers a bad or unverified access_key with HTTP 200 and
        // {"success":false}, so the body decides, not the status alone.
        return r
          .json()
          .catch(function () { return { success: r.ok }; })
          .then(function (j) {
            if (!r.ok || j.success === false) throw new Error("rejected");
            succeed();
          });
      })
      .catch(fail);
  });
})();

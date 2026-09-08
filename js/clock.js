/* clock.js — the live IST clock in the status row, and the footer's year.
 * IST is fixed at UTC+5:30, so the time is derived from UTC rather than from the
 * visitor's own zone: the page shows Bharat's clock wherever it is read.
 */
(function () {
  var el = document.getElementById("ist-clock");
  if (el) {
    var tick = function () {
      var ist = new Date(Date.now() + 5.5 * 3600 * 1000); // UTC+5:30
      var p = function (n) { return String(n).padStart(2, "0"); };
      var hms = p(ist.getUTCHours()) + ":" + p(ist.getUTCMinutes()) + ":" + p(ist.getUTCSeconds());
      // <time> needs a machine-readable value: the visible " IST" suffix is not
      // part of the HTML time microsyntax, so it goes in the text only.
      el.setAttribute("datetime", hms);
      el.textContent = hms + " IST";
    };
    tick();
    setInterval(tick, 1000);
  }

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();

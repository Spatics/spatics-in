/* config.js — the only file you edit to wire the access form up.
 *
 * FORM_ENDPOINT   Web3Forms ("https://api.web3forms.com/submit") or a Formspree
 *                 form URL ("https://formspree.io/f/xxxxxxx"). Empty = demo mode:
 *                 the form logs a warning and shows the success state anyway.
 * FORM_ACCESS_KEY Web3Forms access key. Sent as `access_key`. Leave empty for
 *                 Formspree, which ignores unknown fields.
 * FALLBACK_EMAIL  Shown as a mailto link if the POST fails. Empty = no link.
 */
window.CONFIG = {
  FORM_ENDPOINT: "",
  FORM_ACCESS_KEY: "",
  FALLBACK_EMAIL: ""
};

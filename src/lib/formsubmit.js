/*
  Sends form submissions to the Bommie inbox via FormSubmit (no backend needed).
  The inbox was activated once via FormSubmit's confirmation email; after that,
  every submission arrives as an email.
*/
export const INBOX = 'hello@bommienoosa.com'
// FormSubmit's private alias for INBOX, so the address itself isn't in the form endpoint
const FORM_ID = '5c63023e19724e35d1c74804a6277297'
const ENDPOINT = `https://formsubmit.co/ajax/${FORM_ID}`

export async function sendToInbox(fields) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ _template: 'table', ...fields }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || String(data.success) !== 'true') throw new Error(data.message || 'Request failed')
}

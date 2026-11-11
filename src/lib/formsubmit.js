/*
  Sends form submissions to the Bommie inbox via FormSubmit (no backend needed).
  The inbox was activated once via FormSubmit's confirmation email; after that,
  every submission arrives as an email.
*/
export const INBOX = 'hello@bommienoosa.com'
const ENDPOINT = `https://formsubmit.co/ajax/${INBOX}`

export async function sendToInbox(fields) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ _template: 'table', ...fields }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || String(data.success) !== 'true') throw new Error(data.message || 'Request failed')
}

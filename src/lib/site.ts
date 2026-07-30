export const WA_NUMBER = '919292008096'
export const MAIL = 'Signatureclt16@gmail.com'

export const waLink = (msg: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`

export const mailLink = (subject: string, body: string) =>
  `mailto:${MAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

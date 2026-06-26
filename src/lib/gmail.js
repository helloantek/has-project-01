const BASE = 'https://gmail.googleapis.com/gmail/v1'

async function request(accessToken, path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  if (res.status === 401) throw Object.assign(new Error('Unauthorized'), { status: 401 })
  if (!res.ok) throw new Error(`Gmail API error ${res.status}`)
  return res.json()
}

export const CATEGORIES = {
  INBOX: { id: 'INBOX', label: 'Inbox', icon: '📥' },
  PRIMARY: { id: 'CATEGORY_PERSONAL', label: 'Primary', icon: '👤' },
  UPDATES: { id: 'CATEGORY_UPDATES', label: 'Updates', icon: '🔔' },
  PROMOTIONS: { id: 'CATEGORY_PROMOTIONS', label: 'Promotions', icon: '🏷️' },
  SOCIAL: { id: 'CATEGORY_SOCIAL', label: 'Social', icon: '👥' },
  SENT: { id: 'SENT', label: 'Sent', icon: '📤' },
  STARRED: { id: 'STARRED', label: 'Starred', icon: '⭐' },
  TRASH: { id: 'TRASH', label: 'Trash', icon: '🗑️' },
}

export async function listMessages(accessToken, { labelIds = ['INBOX'], pageToken, maxResults = 30 } = {}) {
  const params = new URLSearchParams({ maxResults })
  labelIds.forEach(id => params.append('labelIds', id))
  if (pageToken) params.set('pageToken', pageToken)

  const data = await request(accessToken, `/users/me/messages?${params}`)
  return data
}

export async function getMessage(accessToken, id) {
  return request(accessToken, `/users/me/messages/${id}?format=full`)
}

export async function batchGetMessages(accessToken, ids) {
  const results = await Promise.all(ids.map(id => getMessage(accessToken, id)))
  return results
}

export async function listLabels(accessToken) {
  const data = await request(accessToken, '/users/me/labels')
  return data.labels || []
}

export async function markAsRead(accessToken, id) {
  return request(accessToken, `/users/me/messages/${id}/modify`, {
    method: 'POST',
    body: JSON.stringify({ removeLabelIds: ['UNREAD'] }),
  })
}

export async function toggleStar(accessToken, id, starred) {
  return request(accessToken, `/users/me/messages/${id}/modify`, {
    method: 'POST',
    body: JSON.stringify(
      starred
        ? { addLabelIds: ['STARRED'] }
        : { removeLabelIds: ['STARRED'] }
    ),
  })
}

export async function trashMessage(accessToken, id) {
  return request(accessToken, `/users/me/messages/${id}/trash`, { method: 'POST' })
}

export function parseHeaders(headers) {
  const map = {}
  for (const h of headers) map[h.name.toLowerCase()] = h.value
  return map
}

export function getBody(payload) {
  const tryDecode = (data) => {
    try {
      return atob(data.replace(/-/g, '+').replace(/_/g, '/'))
    } catch {
      return ''
    }
  }

  if (payload.body?.data) return { html: false, content: tryDecode(payload.body.data) }

  const findPart = (parts, mimeType) => {
    for (const p of parts || []) {
      if (p.mimeType === mimeType && p.body?.data) return tryDecode(p.body.data)
      if (p.parts) {
        const found = findPart(p.parts, mimeType)
        if (found) return found
      }
    }
    return null
  }

  const html = findPart(payload.parts, 'text/html')
  if (html) return { html: true, content: html }
  const text = findPart(payload.parts, 'text/plain')
  if (text) return { html: false, content: text }
  return { html: false, content: '' }
}

export function buildRawEmail({ to, from, subject, body, replyTo, references, inReplyTo }) {
  const headers = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
  ]
  if (replyTo) headers.push(`Reply-To: ${replyTo}`)
  if (references) headers.push(`References: ${references}`)
  if (inReplyTo) headers.push(`In-Reply-To: ${inReplyTo}`)

  const email = headers.join('\r\n') + '\r\n\r\n' + body
  return btoa(unescape(encodeURIComponent(email)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

export async function sendEmail(accessToken, emailData) {
  const raw = buildRawEmail(emailData)
  return request(accessToken, '/users/me/messages/send', {
    method: 'POST',
    body: JSON.stringify({ raw, ...(emailData.threadId ? { threadId: emailData.threadId } : {}) }),
  })
}

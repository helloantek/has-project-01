import React, { useEffect, useState, useCallback } from 'react'
import DOMPurify from 'dompurify'
import { getMessage, getBody, parseHeaders, toggleStar, trashMessage } from '../lib/gmail.js'

function formatFullDate(date) {
  if (!date) return ''
  const d = date instanceof Date ? date : new Date(date)
  return d.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })
}

function EmailBody({ payload }) {
  const { html, content } = getBody(payload || {})

  if (!content) return <p className="thread-body__empty">No content</p>

  if (html) {
    const clean = DOMPurify.sanitize(content, {
      ADD_TAGS: ['style'],
      FORBID_ATTR: ['onerror', 'onload', 'onclick'],
    })
    return (
      <div
        className="thread-body thread-body--html"
        dangerouslySetInnerHTML={{ __html: clean }}
      />
    )
  }

  return (
    <pre className="thread-body thread-body--text">{content}</pre>
  )
}

export default function EmailThread({ email, activeAccount, refreshToken, onReply, onClose, updateEmail, removeEmail }) {
  const [fullMessage, setFullMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const getToken = useCallback(async () => {
    let token = activeAccount?.accessToken
    if (activeAccount?.tokenExpiry && Date.now() > activeAccount.tokenExpiry - 60000) {
      token = await refreshToken(activeAccount.id)
    }
    return token
  }, [activeAccount, refreshToken])

  useEffect(() => {
    if (!email || !activeAccount) { setFullMessage(null); return }
    setLoading(true)
    getToken()
      .then(token => getMessage(token, email.id))
      .then(msg => setFullMessage(msg))
      .catch(() => setFullMessage(null))
      .finally(() => setLoading(false))
  }, [email?.id, activeAccount?.id])

  const handleStar = useCallback(async () => {
    if (!email) return
    const newStarred = !email.isStarred
    updateEmail(email.id, { isStarred: newStarred })
    try {
      const token = await getToken()
      await toggleStar(token, email.id, newStarred)
    } catch {
      updateEmail(email.id, { isStarred: email.isStarred })
    }
  }, [email, getToken, updateEmail])

  const handleTrash = useCallback(async () => {
    if (!email) return
    removeEmail(email.id)
    onClose()
    try {
      const token = await getToken()
      await trashMessage(token, email.id)
    } catch {}
  }, [email, getToken, removeEmail, onClose])

  if (!email) {
    return (
      <div className="thread-pane thread-pane--empty" aria-label="No email selected">
        <div className="thread-pane__placeholder">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <rect x="4" y="8" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M4 12l16 10 16-10" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          <p>Select a message to read</p>
        </div>
      </div>
    )
  }

  const headers = fullMessage ? parseHeaders(fullMessage.payload?.headers || []) : {}
  const payload = fullMessage?.payload || email.payload

  return (
    <article className="thread-pane" aria-label="Email message">
      <div className="thread-pane__header">
        <button className="thread-btn thread-btn--close" onClick={onClose} aria-label="Close">
          ←
        </button>
        <div className="thread-pane__actions">
          <button
            className={`thread-btn ${email.isStarred ? 'thread-btn--starred' : ''}`}
            onClick={handleStar}
            aria-label={email.isStarred ? 'Unstar' : 'Star'}
            title={email.isStarred ? 'Unstar' : 'Star'}
          >
            {email.isStarred ? '★' : '☆'}
          </button>
          <button className="thread-btn" onClick={() => onReply(email)} aria-label="Reply" title="Reply">
            ↩
          </button>
          <button className="thread-btn thread-btn--danger" onClick={handleTrash} aria-label="Trash" title="Move to trash">
            🗑
          </button>
        </div>
      </div>

      <div className="thread-pane__subject">
        <h1 className="thread-subject">{email.subject}</h1>
      </div>

      <div className="thread-pane__meta">
        <div className="thread-meta">
          <div className="thread-meta__from">
            <strong>From:</strong> {headers.from || email.from}
          </div>
          <div className="thread-meta__to">
            <strong>To:</strong> {headers.to || email.to}
          </div>
          <div className="thread-meta__date">
            {formatFullDate(email.date)}
          </div>
        </div>
      </div>

      <div className="thread-pane__body">
        {loading ? (
          <div className="thread-loading">
            <div className="skeleton" style={{ height: '200px', borderRadius: 'var(--radius-md)' }} />
          </div>
        ) : (
          <EmailBody payload={payload} />
        )}
      </div>
    </article>
  )
}

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { sendEmail } from '../lib/gmail.js'

export default function Composer({ activeAccount, refreshToken, defaults = {}, onClose, onSent }) {
  const [to, setTo] = useState(defaults.to || '')
  const [subject, setSubject] = useState(defaults.subject || '')
  const [body, setBody] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  const bodyRef = useRef(null)

  useEffect(() => {
    bodyRef.current?.focus()
  }, [])

  const getToken = useCallback(async () => {
    let token = activeAccount?.accessToken
    if (activeAccount?.tokenExpiry && Date.now() > activeAccount.tokenExpiry - 60000) {
      token = await refreshToken(activeAccount.id)
    }
    return token
  }, [activeAccount, refreshToken])

  const handleSend = useCallback(async () => {
    if (!to.trim() || !activeAccount) return
    setSending(true)
    setError(null)
    try {
      const token = await getToken()
      await sendEmail(token, {
        from: `${activeAccount.name} <${activeAccount.email}>`,
        to: to.trim(),
        subject: subject.trim() || '(no subject)',
        body: body.replace(/\n/g, '<br>'),
        threadId: defaults.threadId,
        inReplyTo: defaults.inReplyTo,
        references: defaults.references,
      })
      onSent()
    } catch (err) {
      setError(err.message || 'Failed to send')
      setSending(false)
    }
  }, [to, subject, body, activeAccount, getToken, defaults, onSent])

  const handleKeyDown = useCallback((e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') handleSend()
    if (e.key === 'Escape') onClose()
  }, [handleSend, onClose])

  return (
    <div className="composer-overlay" role="dialog" aria-modal="true" aria-label="Compose email">
      <div className="composer" onKeyDown={handleKeyDown}>
        <div className="composer__header">
          <span className="composer__title">
            {defaults.threadId ? 'Reply' : 'New Message'}
          </span>
          <button className="composer__close" onClick={onClose} aria-label="Close composer">×</button>
        </div>

        <div className="composer__fields">
          <div className="composer__field">
            <label className="composer__label" htmlFor="composer-to">To</label>
            <input
              id="composer-to"
              className="composer__input"
              type="email"
              multiple
              value={to}
              onChange={e => setTo(e.target.value)}
              placeholder="recipient@example.com"
            />
          </div>
          <div className="composer__field composer__field--divider">
            <label className="composer__label" htmlFor="composer-subject">Subject</label>
            <input
              id="composer-subject"
              className="composer__input"
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="Subject"
            />
          </div>
        </div>

        <textarea
          ref={bodyRef}
          className="composer__body"
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder="Write your message…"
          aria-label="Message body"
        />

        {error && <p className="composer__error">{error}</p>}

        <div className="composer__footer">
          <span className="composer__hint">⌘ Enter to send · Esc to close</span>
          <button
            className="btn btn--primary"
            onClick={handleSend}
            disabled={sending || !to.trim() || !activeAccount}
          >
            {sending ? 'Sending…' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  )
}

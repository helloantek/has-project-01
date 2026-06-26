import React, { useCallback } from 'react'
import { markAsRead, toggleStar, trashMessage } from '../lib/gmail.js'

function formatDate(date) {
  if (!date) return ''
  const now = new Date()
  const d = date instanceof Date ? date : new Date(date)
  if (isNaN(d)) return ''
  const diff = now - d
  if (diff < 86400000 && now.getDate() === d.getDate()) {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  if (diff < 604800000) {
    return d.toLocaleDateString([], { weekday: 'short' })
  }
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' })
}

function senderName(from) {
  if (!from) return ''
  const match = from.match(/^"?([^"<]+)"?\s*(?:<.*>)?$/)
  return match ? match[1].trim() : from
}

function EmailRow({ email, isSelected, onSelect, onStar, onTrash }) {
  return (
    <div
      className={`email-row ${email.isUnread ? 'email-row--unread' : ''} ${isSelected ? 'email-row--selected' : ''}`}
      onClick={() => onSelect(email)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onSelect(email)}
      aria-selected={isSelected}
    >
      <button
        className={`email-row__star ${email.isStarred ? 'email-row__star--on' : ''}`}
        onClick={e => { e.stopPropagation(); onStar(email) }}
        aria-label={email.isStarred ? 'Unstar' : 'Star'}
        title={email.isStarred ? 'Unstar' : 'Star'}
      >
        {email.isStarred ? '★' : '☆'}
      </button>

      <div className="email-row__sender">{senderName(email.from)}</div>
      <div className="email-row__content">
        <span className="email-row__subject">{email.subject}</span>
        <span className="email-row__snippet"> — {email.snippet}</span>
      </div>
      <div className="email-row__meta">
        <span className="email-row__date">{formatDate(email.date)}</span>
        <button
          className="email-row__trash"
          onClick={e => { e.stopPropagation(); onTrash(email) }}
          aria-label="Move to trash"
          title="Move to trash"
        >
          🗑
        </button>
      </div>
    </div>
  )
}

export default function EmailList({
  emails,
  loading,
  error,
  hasMore,
  selectedId,
  activeLabel,
  onSelect,
  onLoadMore,
  onReload,
  updateEmail,
  removeEmail,
  activeAccount,
  refreshToken,
}) {
  const getToken = useCallback(async () => {
    let token = activeAccount?.accessToken
    if (activeAccount?.tokenExpiry && Date.now() > activeAccount.tokenExpiry - 60000) {
      token = await refreshToken(activeAccount.id)
    }
    return token
  }, [activeAccount, refreshToken])

  const handleSelect = useCallback(async (email) => {
    onSelect(email)
    if (email.isUnread) {
      try {
        const token = await getToken()
        await markAsRead(token, email.id)
        updateEmail(email.id, { isUnread: false })
      } catch {}
    }
  }, [onSelect, getToken, updateEmail])

  const handleStar = useCallback(async (email) => {
    const newStarred = !email.isStarred
    updateEmail(email.id, { isStarred: newStarred })
    try {
      const token = await getToken()
      await toggleStar(token, email.id, newStarred)
    } catch {
      updateEmail(email.id, { isStarred: email.isStarred })
    }
  }, [getToken, updateEmail])

  const handleTrash = useCallback(async (email) => {
    removeEmail(email.id)
    try {
      const token = await getToken()
      await trashMessage(token, email.id)
    } catch {
      onReload()
    }
  }, [getToken, removeEmail, onReload])

  const isEmpty = !loading && !error && emails.length === 0

  return (
    <main className="email-list" role="region" aria-label="Email list">
      <div className="email-list__toolbar">
        <button className="toolbar-btn" onClick={onReload} aria-label="Refresh" title="Refresh">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 7a6 6 0 1 0 1.2-3.6M1 3.4V7H4.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="email-list__items" role="list">
        {error && (
          <div className="email-list__state email-list__state--error">
            <p>Failed to load messages: {error}</p>
            <button className="btn btn--sm" onClick={onReload}>Retry</button>
          </div>
        )}

        {!error && !activeAccount && (
          <div className="email-list__state">
            <p>Sign in to view your email</p>
          </div>
        )}

        {emails.map(email => (
          <EmailRow
            key={email.id}
            email={email}
            isSelected={email.id === selectedId}
            onSelect={handleSelect}
            onStar={handleStar}
            onTrash={handleTrash}
          />
        ))}

        {loading && (
          <div className="email-list__state">
            <div className="loading-rows">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="loading-row">
                  <div className="loading-row__sender skeleton" />
                  <div className="loading-row__content skeleton" />
                  <div className="loading-row__date skeleton" />
                </div>
              ))}
            </div>
          </div>
        )}

        {isEmpty && (
          <div className="email-list__state">
            <p className="email-list__empty-text">No messages</p>
          </div>
        )}

        {hasMore && !loading && (
          <button className="load-more-btn" onClick={onLoadMore}>
            Load more
          </button>
        )}
      </div>
    </main>
  )
}

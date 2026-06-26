import React, { useState } from 'react'
import { CATEGORIES } from '../lib/gmail.js'

const NAV_CATEGORIES = [
  CATEGORIES.INBOX,
  CATEGORIES.PRIMARY,
  CATEGORIES.UPDATES,
  CATEGORIES.PROMOTIONS,
  CATEGORIES.SOCIAL,
  CATEGORIES.STARRED,
  CATEGORIES.SENT,
  CATEGORIES.TRASH,
]

function AccountAvatar({ account, size = 'md', onClick }) {
  const initials = account.name
    ? account.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : account.email[0].toUpperCase()

  return (
    <button
      className={`account-avatar account-avatar--${size}`}
      onClick={onClick}
      title={`${account.name || account.email}\n${account.email}`}
      aria-label={account.email}
    >
      {account.picture
        ? <img src={account.picture} alt={initials} />
        : <span>{initials}</span>}
    </button>
  )
}

export default function Sidebar({
  accounts,
  activeId,
  activeLabel,
  onSwitchAccount,
  onAddAccount,
  onRemoveAccount,
  onLabelChange,
  onCompose,
}) {
  const [addingAccount, setAddingAccount] = useState(false)
  const [accountMenuOpen, setAccountMenuOpen] = useState(false)
  const activeAccount = accounts.find(a => a.id === activeId)

  async function handleAddAccount() {
    setAddingAccount(true)
    try {
      await onAddAccount()
    } finally {
      setAddingAccount(false)
    }
  }

  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <span className="sidebar__logo">Mail</span>

        <div className="sidebar__accounts">
          {accounts.map(acc => (
            <AccountAvatar
              key={acc.id}
              account={acc}
              size={acc.id === activeId ? 'active' : 'sm'}
              onClick={() => onSwitchAccount(acc.id)}
            />
          ))}
          <button
            className="account-avatar account-avatar--add"
            onClick={handleAddAccount}
            disabled={addingAccount}
            title="Add account"
            aria-label="Add Gmail account"
          >
            {addingAccount ? '…' : '+'}
          </button>
        </div>
      </div>

      {activeAccount && (
        <div className="sidebar__active-account">
          <AccountAvatar account={activeAccount} size="lg" onClick={() => setAccountMenuOpen(v => !v)} />
          <div className="sidebar__active-account-info">
            <span className="sidebar__account-name">{activeAccount.name}</span>
            <span className="sidebar__account-email">{activeAccount.email}</span>
          </div>
          {accountMenuOpen && (
            <div className="account-menu">
              <button
                className="account-menu__item account-menu__item--danger"
                onClick={() => { onRemoveAccount(activeAccount.id); setAccountMenuOpen(false) }}
              >
                Remove account
              </button>
            </div>
          )}
        </div>
      )}

      <button className="compose-btn" onClick={onCompose}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M2 14l1.5-4.5L11 2l3 3-7.5 7.5L2 14z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M9.5 3.5l3 3" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
        Compose
      </button>

      {!activeAccount && accounts.length === 0 && (
        <p className="sidebar__empty">Sign in to get started</p>
      )}

      <nav className="sidebar__nav" aria-label="Mail categories">
        {NAV_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`nav-item ${activeLabel === cat.id ? 'nav-item--active' : ''}`}
            onClick={() => onLabelChange(cat.id)}
            aria-current={activeLabel === cat.id ? 'page' : undefined}
          >
            <span className="nav-item__icon" aria-hidden="true">{cat.icon}</span>
            <span className="nav-item__label">{cat.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}

import React, { useState, useCallback } from 'react'
import { useAccounts } from './hooks/useAccounts.js'
import { useEmails } from './hooks/useEmails.js'
import Sidebar from './components/Sidebar.jsx'
import EmailList from './components/EmailList.jsx'
import EmailThread from './components/EmailThread.jsx'
import Composer from './components/Composer.jsx'
import { CATEGORIES } from './lib/gmail.js'

export default function App() {
  const { accounts, activeAccount, activeId, addAccount, removeAccount, switchAccount, refreshToken } = useAccounts()
  const [activeLabel, setActiveLabel] = useState('INBOX')
  const [selectedEmail, setSelectedEmail] = useState(null)
  const [composerOpen, setComposerOpen] = useState(false)
  const [composerDefaults, setComposerDefaults] = useState({})

  const { emails, loading, error, loadMore, hasMore, updateEmail, removeEmail, reload } = useEmails(
    activeAccount,
    activeLabel,
    refreshToken,
  )

  const handleSelectEmail = useCallback((email) => {
    setSelectedEmail(email)
  }, [])

  const handleLabelChange = useCallback((label) => {
    setActiveLabel(label)
    setSelectedEmail(null)
  }, [])

  const handleReply = useCallback((email) => {
    const headers = email.payload?.headers || []
    const getHeader = (name) => headers.find(h => h.name.toLowerCase() === name)?.value || ''
    setComposerDefaults({
      to: getHeader('from'),
      subject: `Re: ${getHeader('subject')}`,
      threadId: email.threadId,
      inReplyTo: getHeader('message-id'),
      references: getHeader('references')
        ? `${getHeader('references')} ${getHeader('message-id')}`
        : getHeader('message-id'),
    })
    setComposerOpen(true)
  }, [])

  const handleCompose = useCallback(() => {
    setComposerDefaults({})
    setComposerOpen(true)
  }, [])

  const noClientId = !import.meta.env.VITE_GOOGLE_CLIENT_ID

  return (
    <div className="app-shell">
      {noClientId && (
        <div className="setup-banner">
          <strong>Setup required:</strong> Add your Google OAuth Client ID to <code>.env.local</code> as{' '}
          <code>VITE_GOOGLE_CLIENT_ID=your_client_id</code> and restart the dev server.
        </div>
      )}

      <Sidebar
        accounts={accounts}
        activeId={activeId}
        activeLabel={activeLabel}
        onSwitchAccount={switchAccount}
        onAddAccount={addAccount}
        onRemoveAccount={removeAccount}
        onLabelChange={handleLabelChange}
        onCompose={handleCompose}
      />

      <EmailList
        emails={emails}
        loading={loading}
        error={error}
        hasMore={hasMore}
        selectedId={selectedEmail?.id}
        activeLabel={activeLabel}
        onSelect={handleSelectEmail}
        onLoadMore={loadMore}
        onReload={reload}
        updateEmail={updateEmail}
        removeEmail={removeEmail}
        activeAccount={activeAccount}
        refreshToken={refreshToken}
      />

      <EmailThread
        email={selectedEmail}
        activeAccount={activeAccount}
        refreshToken={refreshToken}
        onReply={handleReply}
        onClose={() => setSelectedEmail(null)}
        updateEmail={updateEmail}
        removeEmail={removeEmail}
      />

      {composerOpen && (
        <Composer
          activeAccount={activeAccount}
          refreshToken={refreshToken}
          defaults={composerDefaults}
          onClose={() => setComposerOpen(false)}
          onSent={() => {
            setComposerOpen(false)
            if (activeLabel === 'SENT') reload()
          }}
        />
      )}
    </div>
  )
}

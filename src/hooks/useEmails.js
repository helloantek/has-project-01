import { useState, useEffect, useCallback, useRef } from 'react'
import { listMessages, batchGetMessages, parseHeaders } from '../lib/gmail.js'

function parseMessage(msg) {
  const headers = parseHeaders(msg.payload?.headers || [])
  return {
    id: msg.id,
    threadId: msg.threadId,
    subject: headers.subject || '(no subject)',
    from: headers.from || '',
    to: headers.to || '',
    date: headers.date ? new Date(headers.date) : new Date(parseInt(msg.internalDate)),
    snippet: msg.snippet || '',
    labelIds: msg.labelIds || [],
    isUnread: (msg.labelIds || []).includes('UNREAD'),
    isStarred: (msg.labelIds || []).includes('STARRED'),
    payload: msg.payload,
  }
}

export function useEmails(activeAccount, activeLabel, refreshToken) {
  const [emails, setEmails] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [nextPageToken, setNextPageToken] = useState(null)
  const abortRef = useRef(null)

  const load = useCallback(async (reset = true) => {
    if (!activeAccount?.accessToken) return
    if (abortRef.current) abortRef.current.abort()
    const ctrl = new AbortController()
    abortRef.current = ctrl

    setLoading(true)
    if (reset) {
      setEmails([])
      setNextPageToken(null)
      setError(null)
    }

    try {
      let token = activeAccount.accessToken
      if (activeAccount.tokenExpiry && Date.now() > activeAccount.tokenExpiry - 60000) {
        token = await refreshToken(activeAccount.id)
      }

      const labelIds = [activeLabel]
      const listData = await listMessages(token, {
        labelIds,
        pageToken: reset ? undefined : nextPageToken,
        maxResults: 30,
      })

      if (ctrl.signal.aborted) return

      const ids = (listData.messages || []).map(m => m.id)
      if (!ids.length) {
        setEmails(reset ? [] : e => e)
        setLoading(false)
        return
      }

      const messages = await batchGetMessages(token, ids)
      if (ctrl.signal.aborted) return

      const parsed = messages.map(parseMessage)
      setEmails(prev => reset ? parsed : [...prev, ...parsed])
      setNextPageToken(listData.nextPageToken || null)
    } catch (err) {
      if (!ctrl.signal.aborted) setError(err.message)
    } finally {
      if (!ctrl.signal.aborted) setLoading(false)
    }
  }, [activeAccount, activeLabel, nextPageToken, refreshToken])

  useEffect(() => {
    load(true)
  }, [activeAccount?.id, activeLabel])

  const loadMore = useCallback(() => {
    if (nextPageToken && !loading) load(false)
  }, [nextPageToken, loading, load])

  const updateEmail = useCallback((id, patch) => {
    setEmails(prev => prev.map(e => e.id === id ? { ...e, ...patch } : e))
  }, [])

  const removeEmail = useCallback((id) => {
    setEmails(prev => prev.filter(e => e.id !== id))
  }, [])

  return { emails, loading, error, loadMore, hasMore: !!nextPageToken, updateEmail, removeEmail, reload: () => load(true) }
}

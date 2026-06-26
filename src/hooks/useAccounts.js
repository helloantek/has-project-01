import { useState, useCallback, useRef } from 'react'
import { initTokenClient, fetchUserInfo, loadStoredAccounts, saveAccounts } from '../lib/auth.js'

export function useAccounts() {
  const [accounts, setAccounts] = useState(() => loadStoredAccounts())
  const [activeId, setActiveId] = useState(() => loadStoredAccounts()[0]?.id || null)
  const tokenClientRef = useRef(null)

  const activeAccount = accounts.find(a => a.id === activeId) || null

  const addAccount = useCallback(() => {
    return new Promise((resolve, reject) => {
      tokenClientRef.current = initTokenClient(
        async (tokenResponse) => {
          try {
            const info = await fetchUserInfo(tokenResponse.access_token)
            const account = {
              id: info.id,
              email: info.email,
              name: info.name,
              picture: info.picture,
              accessToken: tokenResponse.access_token,
              tokenExpiry: Date.now() + (tokenResponse.expires_in * 1000),
            }
            setAccounts(prev => {
              const filtered = prev.filter(a => a.id !== account.id)
              const updated = [...filtered, account]
              saveAccounts(updated)
              return updated
            })
            setActiveId(account.id)
            resolve(account)
          } catch (err) {
            reject(err)
          }
        },
        reject,
      )
      tokenClientRef.current.requestAccessToken()
    })
  }, [])

  const refreshToken = useCallback((accountId) => {
    return new Promise((resolve, reject) => {
      tokenClientRef.current = initTokenClient(
        async (tokenResponse) => {
          setAccounts(prev => {
            const updated = prev.map(a =>
              a.id === accountId
                ? { ...a, accessToken: tokenResponse.access_token, tokenExpiry: Date.now() + tokenResponse.expires_in * 1000 }
                : a
            )
            saveAccounts(updated)
            return updated
          })
          resolve(tokenResponse.access_token)
        },
        reject,
      )
      tokenClientRef.current.requestAccessToken({ hint: accounts.find(a => a.id === accountId)?.email })
    })
  }, [accounts])

  const removeAccount = useCallback((id) => {
    setAccounts(prev => {
      const updated = prev.filter(a => a.id !== id)
      saveAccounts(updated)
      return updated
    })
    setActiveId(prev => prev === id ? (accounts.find(a => a.id !== id)?.id || null) : prev)
  }, [accounts])

  const switchAccount = useCallback((id) => setActiveId(id), [])

  return { accounts, activeAccount, activeId, addAccount, removeAccount, switchAccount, refreshToken }
}

const SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
].join(' ')

export function getClientId() {
  return import.meta.env.VITE_GOOGLE_CLIENT_ID || ''
}

export function initTokenClient(onSuccess, onError) {
  return window.google.accounts.oauth2.initTokenClient({
    client_id: getClientId(),
    scope: SCOPES,
    callback: (response) => {
      if (response.error) {
        onError(response)
      } else {
        onSuccess(response)
      }
    },
  })
}

export async function fetchUserInfo(accessToken) {
  const res = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!res.ok) throw new Error('Failed to fetch user info')
  return res.json()
}

const STORAGE_KEY = 'gmail_accounts'

export function loadStoredAccounts() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

export function saveAccounts(accounts) {
  // Store only non-sensitive info (tokens expire anyway)
  const safe = accounts.map(({ accessToken, ...rest }) => rest)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(safe))
}

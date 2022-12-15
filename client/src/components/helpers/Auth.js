import { Buffer } from 'buffer'

const tokenName = 'token'

// save token to local storage
export const setToken = (token) => {
  localStorage.setItem(tokenName, token)
}
// get token to local storage
export const getToken = () => {
  return localStorage.getItem(tokenName)
}
// returns user ID from sub from token saved in localStorage
export const getUserId = () => {
  return getPayload().sub
}

export const getPayload = () => {
  const token = getToken()
  if (!token) return false
  const splitToken = token.split('.')
  if (splitToken.length !== 3) return false
  return JSON.parse(Buffer.from(splitToken[1], 'base64'))
}

export const isAuthenticated = () => {
  const payload = getPayload()
  if (!payload) return false
  const { exp } = payload
  const now = Math.round(Date.now() / 1000)
  return exp > now
}

export const handleLogout = (navigate) => {
  console.log(tokenName)
  localStorage.removeItem(tokenName)
  navigate('/login')
}

export const isOwner = (token1) => {
  const payload = getPayload()
  if (!payload) return false
  return token1 === payload.sub
}

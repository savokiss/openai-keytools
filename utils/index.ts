export function hideApiKey (key: string) {
  return key.replace(/^(sk-[a-zA-Z0-9]{4})[a-zA-Z0-9]*(.{6})$/, '$1***$2')
}

export function validateKey (key: string) {
  const trimed = key.trim()
  if (!trimed.startsWith('sk-')) {
    return false
  }
  return trimed
}
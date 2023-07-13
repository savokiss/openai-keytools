export function hideApiKey (key: string) {
  return key.replace(/^(sk-[a-zA-Z0-9]{4})[a-zA-Z0-9]*(.{6})$/, '$1***$2')
}
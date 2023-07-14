import type { KeyData } from 'types'

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

export function checkRow (rows: Ref<KeyData[]>, key: string) {
  const index = rows.value.findIndex(item => item.key === key.trim())
  return index > -1
}

export function updateRow (rows: Ref<KeyData[]>, key: string, partialRow: Partial<KeyData>) {
  const index = rows.value.findIndex(item => item.key === key.trim())
  if (index > -1) {
    rows.value.splice(index, 1, {
      ...rows.value[index],
      ...partialRow
    })
  }
  return index > -1
}

export function deleteRow (rows: Ref<KeyData[]>,key: string) {
  const index = rows.value.findIndex(item => item.key === key.trim())
  if (index > -1) {
    rows.value.splice(index, 1)
  }
  return index > -1
}
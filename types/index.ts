export type KeyData = {
  name?: string
  key: string
  totalLimit: number
  totalUsage: number
  remaining: number
  expiryDate: string
  hasGPT4: boolean
  hasPayment: boolean
}

export type LocationInfo = {
  ip: string
  province: string
  city: string
  distinct: string
  isp: string
}
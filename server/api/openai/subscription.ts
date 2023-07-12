
const OPENAI_BASE = 'https://proxy.detools.dev'

type SubResult = {
  hard_limit: number
  hard_limit_used: number
  soft_limit: number
  soft_limit_used: number
  system_hard_limit: number
  system_hard_limit_usd: number
  plan: {
    id: string
    title: string
  }
}

export default eventHandler(async (event) => {
  const { key } = getQuery(event)

  const subscription: SubResult = await $fetch(`${OPENAI_BASE}/v1/dashboard/billing/subscription`, {
    headers: {
      Authorization: `Bearer ${key}`
    }
  })

  return {
    ok: true,
    subscription
  }
})
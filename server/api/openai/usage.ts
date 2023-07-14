
import dayjs from 'dayjs'

const OPENAI_BASE = 'https://proxy.detools.dev'

function getHeaders (key: string) {
  return {
    Authorization: `Bearer ${key}`
  }
}

export default eventHandler(async (event) => {
  const { key } = getQuery(event)

  const subscription: SubResult = await $fetch(`${OPENAI_BASE}/v1/dashboard/billing/subscription`, {
    headers: getHeaders(key as string)
  })
  const hasPayment = subscription.plan.id.includes('payg')
  const expiryDate = dayjs.unix(subscription.access_until)
  const hasExpired = expiryDate.isBefore(dayjs(), 'day')
  const totalLimit = subscription.system_hard_limit_usd

  const models: ModelResult = await $fetch(`${OPENAI_BASE}/v1/models`, {
    headers: getHeaders(key as string)
  })
  const hasGPT4 = models.data.some(item => item.id.includes('gpt-4'))

  const startDate = dayjs().date(1).format('YYYY-MM-DD')
  const endDate = dayjs().format('YYYY-MM-DD')
  const usage: UsageResult = await $fetch(`${OPENAI_BASE}/v1/dashboard/billing/usage?start_date=${startDate}&end_date=${endDate}`, {
    headers: getHeaders(key as string)
  })
  const totalUsage = usage.total_usage / 100

  return {
    key: key as string,
    totalLimit,
    totalUsage,
    remaining: totalLimit - totalUsage,
    hasExpired,
    expiryDate: expiryDate.format('YYYY-MM-DD'),
    hasGPT4,
    hasPayment,
  }
})
type SubResult = {
  access_until: number
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

type ModelItem = {
  id: string
  object: string
  root: string
}

type ModelResult = {
  data: ModelItem[],
  object: string
}

type UsageResult = {
  daily_cost: []
  total_usage: number
}

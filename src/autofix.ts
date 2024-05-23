import {
  parseForRest,
  parseForUS,
} from '@/parse'

import { isUndefined } from '@/predicates'

const pad = (value: number | string) => String(value).padStart(2, '0')

export const fixForUS = (value: string) => {
  const [[, month], s1, [rawDay, day], s2, [rawYear]] = parseForUS(value)

  let result = ''

  if (!isUndefined(month)) { result += pad(month) }
  if (!isUndefined(s1)) { result += s1 }
  if (!isUndefined(day)) { result += pad(day) } else if (!isUndefined(rawDay)) { result += rawDay }
  if (!isUndefined(s2)) { result += s2 }
  if (!isUndefined(rawYear)) { result += rawYear }

  return result.length ? result : value
}

export const fixForRest = (value: string) => {
  const [[, day], s1, [rawMonth, month], s2, [rawYear]] = parseForRest(value)

  let result = ''

  if (!isUndefined(day)) { result += pad(day) }
  if (!isUndefined(s1)) { result += s1 }
  if (!isUndefined(month)) { result += pad(month) } else if (!isUndefined(rawMonth)) { result += rawMonth }
  if (!isUndefined(s2)) { result += s2 }
  if (!isUndefined(rawYear)) { result += rawYear }

  return result
}

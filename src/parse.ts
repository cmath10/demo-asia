import { isUndefined } from '@/predicates'

export type Maybe<T> = T | undefined
export type Part = [Maybe<string>, Maybe<number>]
export type Separator = Maybe<string>

const restrict = (value: number, [min, max]: [number, number]) => Math.min(Math.max(value, min), max)

const MAX_PER_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

function getMaxDay(month: number | undefined, year: number | undefined) {
  if (isUndefined(month)) { return 31 }
  if (isUndefined(year)) { return MAX_PER_MONTH[month - 1] ?? 31 }

  return new Date(year, month, 0).getDate()
}

export const parseDay = (
  rawDay: Maybe<string>,
  month: Maybe<number>,
  year: Maybe<number>,
  finished: boolean
) => rawDay && finished
  ? restrict(Number(rawDay), [1, getMaxDay(month, year)])
  : undefined

export const parseMonth = (rawMonth: Maybe<string>, finished: boolean) => rawMonth && finished
  ? restrict(Number(rawMonth), [1, 12])
  : undefined

export const parseForUS = (value: string): [Part, Separator, Part, Separator, Part] => {
  const [rawMonth, s1, rawDay, s2, rawYear] = value.split(/(\/)/)

  const year = rawYear?.length === 4 ? Number(rawYear) : undefined
  const month = parseMonth(rawMonth, !isUndefined(s1))
  const day = parseDay(rawDay, month, year, !isUndefined(s2))

  return [[rawMonth, month], s1, [rawDay, day], s2, [rawYear, year]]
}

export const parseForRest = (value: string): [Part, Separator, Part, Separator, Part] => {
  const [rawDay, s1, rawMonth, s2, rawYear] = value.split(/(\/)/)

  const year = rawYear?.length === 4 ? Number(rawYear) : undefined
  const month = parseMonth(rawMonth, !isUndefined(s2))
  const day = parseDay(rawDay, month, year, !isUndefined(s1))

  return [[rawDay, day], s1, [rawMonth, month], s2, [rawYear, year]]
}

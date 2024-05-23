export const isUndefined = (value: unknown): value is undefined => typeof value === 'undefined'

export const isDateString = (value: string) => !isNaN(Date.parse(value))

import {
  describe,
  expect,
  test,
} from 'vitest'

import DateInput from '../../src/DateInput.vue'

import { renderToString } from '@vue/test-utils'

describe('SSR', () => {
  test('basic', async () => {
    const result = await renderToString(DateInput, {
      props: {
        value: '12/30/2024',
      },
    })

    expect(result).toEqual('<input value="12/30/2024">')
  })
})

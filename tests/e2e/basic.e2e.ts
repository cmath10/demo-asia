import { test, expect } from '@playwright/test'
import process from 'process'

const SERVER = process.env.SERVER || 'localhost'

test('input', async ({ page }) => {
  await page.goto(`http://${SERVER}:3000/case/basic`)

  await page.getByPlaceholder('Date').fill('12/31/2024')

  await expect(page.getByPlaceholder('Date')).toHaveValue('12/31/2024')
})

test('keystroke', async ({ page }) => {
  await page.goto(`http://${SERVER}:3000/case/basic`)

  await page.getByPlaceholder('Date').press('1')
  await page.getByPlaceholder('Date').press('2')
  await page.getByPlaceholder('Date').press('3')
  await page.getByPlaceholder('Date').press('1')
  await page.getByPlaceholder('Date').press('2')
  await page.getByPlaceholder('Date').press('0')
  await page.getByPlaceholder('Date').press('2')
  await page.getByPlaceholder('Date').press('4')

  await expect(page.getByPlaceholder('Date')).toHaveValue('12/31/2024')
})

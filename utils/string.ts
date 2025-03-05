import mongoose from 'mongoose'
import { ChangeEvent } from 'react'

export const getMoneyColor = (value: string | number) => {
  value = Number(value)
  if (value < 0) return 'safe-red-color'
  if (value > 0) return 'safe-green-color'
  return 'safe-light-color'
}

export const createObjectId = (value: string) => {
  return new mongoose.Types.ObjectId(value)
}

export const formatMoney = (value: number | string, removeCipher = false) => {
  if (typeof value === 'string') value = Number(value)
  if (isNaN(value)) value = 0
  const formated = value.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  })
  if (removeCipher) {
    // remover apenas R$, mas pode ter sinal de menos
    if (formated.startsWith('-R$')) {
      return '-' + formated.slice(3)
    }
    return formated.slice(2)
  }
  return formated
}

export const formatInputMoney = (event: ChangeEvent<HTMLInputElement>) => {
  const onlyDigits = event.target.value
    .split('')
    .filter((s: any) => /\d/.test(s))
    .join('')
    .padStart(3, '0')
  const digitsFloat = onlyDigits.slice(0, -2) + '.' + onlyDigits.slice(-2)
  return formatMoney(digitsFloat)
}

export const removeMoneyMask = (value: string) => {
  return value.slice(2).replace(/\./g, '').replace(/,/g, '.')
}

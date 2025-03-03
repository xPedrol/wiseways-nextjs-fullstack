import mongoose from 'mongoose'

export const getMoneyColor = (value: string | number) => {
  value = Number(value)
  if (value < 0) return 'safe-red-color'
  if (value > 0) return 'safe-green-color'
  return 'safe-light-color'
}

export const createObjectId = (value: string) => {
  return new mongoose.Types.ObjectId(value)
}

export const formatMoney = (value: number | string) => {
  if (typeof value === 'string') value = Number(value)
  if (isNaN(value)) value = 0
  return value.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  })
}

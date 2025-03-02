import { TTag } from './tag'

export type TExpense = {
  _id?: string
  value: number | string
  tag?: TTag | null
  date: Date | string
  description: string
}

export type TCreateExpense = {
  value: number | string
  tag: string | null
  date: string
  description: string
}

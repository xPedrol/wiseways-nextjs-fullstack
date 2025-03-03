import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export const getDayjs = dayjs

export const isValidDate = (dateString: string | null) => {
  if (!dateString) return null
  const date = new Date(dateString)

  if (
    date instanceof Date &&
    !isNaN(date.getTime()) &&
    dateString.trim() !== ''
  ) {
    return date
  } else {
    return null
  }
}

export const ptbrMonths = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]
export const ptbrDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']

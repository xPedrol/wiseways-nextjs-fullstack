export const getStartOfMonth = (date: Date | string) => {
  if (typeof date === 'string') date = new Date(date)
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export const getEndOfMonth = (date: Date | string) => {
  if (typeof date === 'string') date = new Date(date)
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999)
}

export const getStartOfYear = (date: Date | string) => {
  if (typeof date === 'string') date = new Date(date)
  return new Date(date.getFullYear(), 0, 1)
}

export const getEndOfYear = (date: Date | string) => {
  if (typeof date === 'string') date = new Date(date)
  return new Date(date.getFullYear(), 11, 31, 23, 59, 59, 999)
}

export const isValidDate = (dateString: string | null) => {
  // Tenta criar um objeto Date a partir da string
  if (!dateString) return null
  const date = new Date(dateString)
  // Verifica se o resultado é uma data válida
  // date instanceof Date: Verifica se é um objeto Date
  // !isNaN(date): Verifica se o valor da data não é NaN (ou seja, é uma data válida)
  // dateString.trim(): Remove espaços em branco no início e no final da string
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

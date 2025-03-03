'use client'
import { TimerReset } from 'lucide-react'
import IconButton from '../IconButton'
import Input from '../Input'
import { getDayjs } from '@/utils/date'
import { useRouter } from 'next/navigation'
type Props = {
  currentDate: string
}
export default function ExpensesActions({ currentDate }: Props) {
  const router = useRouter()
  const changeDate = (value: string) => {
    if (value === currentDate) return
    const formated = value + '-01'
    const date = getDayjs(formated)
    const start = date.startOf('month').utc().format()
    const end = date.endOf('month').utc().format()
    router.push(`/despesas?start=${start}&end=${end}`)
  }
  return (
    <>
      <Input
        defaultValue={currentDate}
        onChange={(e) => changeDate(e.target.value)}
        placeholder="Pesquise por um registro..."
        type="month"
        tSize="sm"
        sufix={
          <IconButton
            title="Voltar para o mês atual"
            aria-label="Voltar para o mês atual"
            tSize="sm"
            type="button"
            icon={
              <TimerReset onClick={() => router.push('/despesas')} size={16} />
            }
          />
        }
      />
    </>
  )
}

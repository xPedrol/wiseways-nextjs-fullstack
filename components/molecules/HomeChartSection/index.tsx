'use client'
import { ExpensesByTagChart } from '../ExpensesByTagChart'
import { ExpensesByMonthChart } from '../ExpensesByMonthChart'
import Button from '@/components/atoms/Button'
import { ExpenseByTag } from '@/types/expense'
import { setCookie } from '@/utils/cookie'
import { useRouter } from 'next/navigation'
type Props = {
  sumByMonths: number[]
  sumByTags: ExpenseByTag[]
}
export default function HomeChartSection({ sumByMonths, sumByTags }: Props) {
  const router = useRouter()
  const toggle = () => {
    if (sumByMonths.length === 0) {
      setCookie('chartType', 'sum')
    } else {
      setCookie('chartType', 'tag')
    }
    router.refresh()
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="text-end">
        <Button
          size="sm"
          type="button"
          onClick={() => toggle()}
          className="w-fit"
        >
          Exibir{' '}
          {sumByMonths.length === 0 ? 'Soma dos Registros' : 'Despesas por Tag'}
        </Button>
      </div>

      {sumByMonths.length === 0 ? (
        <div>
          <ExpensesByTagChart
            values={sumByTags.map((sum) => sum.total)}
            labels={sumByTags.map((sum) => sum.tag.name)}
            colors={sumByTags.map((sum) => sum.tag.color)}
          />
        </div>
      ) : (
        <div>
          {sumByMonths && <ExpensesByMonthChart values={sumByMonths} />}
        </div>
      )}
    </div>
  )
}

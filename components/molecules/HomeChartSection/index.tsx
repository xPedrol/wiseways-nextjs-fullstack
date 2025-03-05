'use client'
import { useState } from 'react'
import { ExpensesByTagChart } from '../ExpensesByTagChart'
import { ExpensesByMonthChart } from '../ExpensesByMonthChart'
import Button from '@/components/atoms/Button'
type Props = {
  sumByMonths: number[]
}
export default function HomeChartSection({ sumByMonths }: Props) {
  const [tree, setTree] = useState(false)
  return (
    <div className="flex flex-col gap-4">
      <div className="text-end">
        <Button size="sm" onClick={() => setTree(!tree)} className="w-fit">
          {tree ? 'Gráfico de Linha' : 'Gráfico de Árvore'}
        </Button>
      </div>

      {tree ? (
        <div>
          <ExpensesByTagChart
            values={[
              100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200,
            ]}
            labels={[
              'Alimentação',
              'Transporte',
              'Lazer',
              'Saúde',
              'Educação',
              'Moradia',
              'Vestuário',
              'Contas',
              'Mercado',
              'Outros',
              'Investimentos',
              'Salário',
            ]}
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

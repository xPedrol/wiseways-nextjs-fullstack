import { BarChart1 } from '@/components/molecules/LineChart'
import { BarChart, TrendingDown, TrendingUp } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Início',
}
const cardStyle =
  'flex-1 bg-surface-a10 p-4 rounded-lg flex flex-col gap-2 min-w-[300px]'
export default async function Home() {
  return (
    <div className="custom-contaier">
      <div className="flex content-between flex-wrap gap-4 mb-10">
        <div className={cardStyle}>
          <TrendingUp size={32} stroke="#ab82d0" />
          <h1>Ganhos</h1>
          <p className="font-bold text-2xl text-green-500">R$ 2.000,00</p>
        </div>
        <div className={cardStyle}>
          <TrendingDown size={32} stroke="#ab82d0" />
          <h1>Despesas</h1>
          <p className="font-bold text-2xl text-red-500">R$ 7.000,00</p>
        </div>
        <div className={cardStyle}>
          <BarChart size={32} stroke="#ab82d0" />
          <h1>Total</h1>
          <p
            className={`font-bold text-2xl ${
              -5000 > 0 ? 'text-green-500' : 'text-red-500'
            }`}
          >
            R$ -5.000,00
          </p>
        </div>
      </div>
      <div>
        <BarChart1 />
      </div>
    </div>
  )
}

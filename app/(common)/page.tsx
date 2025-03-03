import { BarChart1 } from '@/components/molecules/LineChart'
import cfetch from '@/config/fetchapi'
import { getDayjs } from '@/utils/date'
import { formatMoney, getMoneyColor } from '@/utils/string'
import { BarChart, TrendingDown, TrendingUp } from 'lucide-react'
import { Metadata } from 'next'
import { headers } from 'next/headers'
export const metadata: Metadata = {
  title: 'Início',
}
const cardStyle =
  'flex-1 bg-surface-a10 px-4 py-2 rounded-lg flex flex-col min-w-[300px]'
export default async function Home() {
  const date = getDayjs()
  const start = date.startOf('year').utc().format()
  const end = date.endOf('year').utc().format()
  const savedHeaders = new Headers(await headers())
  const summaryResponse = await cfetch(
    `/expenses/summary?start=${start}&end=${end}`,
    {
      method: 'GET',
      headers: savedHeaders,
    },
  )
  const summary = {
    gain: 0,
    loss: 0,
    total: 0,
  }
  if (summaryResponse.status === 200) {
    Object.assign(summary, await summaryResponse.json())
  }

  const sumByMonthsResponse = await cfetch(
    `/expenses/sum-months?start=${start}&end=${end}`,
    {
      method: 'GET',
      headers: savedHeaders,
    },
  )
  let sumByMonths = []
  if (sumByMonthsResponse.status === 200) {
    sumByMonths = await sumByMonthsResponse.json()
  }
  console.log(sumByMonths)
  return (
    <div className="custom-contaier">
      <div className="flex content-between flex-wrap gap-4 mb-10">
        <div className={cardStyle}>
          <TrendingUp size={32} stroke="#ab82d0" />
          <h1>Ganhos</h1>
          <p className={`font-bold text-2xl ${getMoneyColor(summary.gain)}`}>
            {formatMoney(summary.gain)}
          </p>
        </div>
        <div className={cardStyle}>
          <TrendingDown size={32} stroke="#ab82d0" />
          <h1>Despesas</h1>
          <p className={`font-bold text-2xl ${getMoneyColor(summary.loss)}`}>
            {formatMoney(summary.loss)}
          </p>
        </div>
        <div className={cardStyle}>
          <BarChart size={32} stroke="#ab82d0" />
          <h1>Total</h1>
          <p className={`font-bold text-2xl ${getMoneyColor(summary.total)}`}>
            {formatMoney(summary.total)}
          </p>
        </div>
      </div>
      <div>{sumByMonths && <BarChart1 values={sumByMonths} />}</div>
    </div>
  )
}

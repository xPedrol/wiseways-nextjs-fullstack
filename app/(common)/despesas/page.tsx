import IconButton from '@/components/atoms/IconButton'
import Input from '@/components/atoms/Input'
import { Pagination } from '@/components/atoms/Pagination'
import cfetch from '@/config/fetchapi'
import { TExpense } from '@/interfaces/expense'
import { getEndOfMonth, getStartOfMonth, ptbrMonths } from '@/utils/date'
import { formatMoney, getMoneyColor } from '@/utils/string'
import { BarChart, Search, TrendingDown, TrendingUp } from 'lucide-react'
import { Metadata } from 'next'
import { headers } from 'next/headers'
export const metadata: Metadata = {
  title: 'Gastos do mês',
}
const cardStyle =
  'flex-1 bg-surface-a10 px-4 py-2 rounded-lg flex flex-col min-w-[300px]'
export default async function Expenses() {
  let expenses: TExpense[] = []
  const date = new Date()
  const month = date.getMonth()
  const year = date.getFullYear()
  const start = getStartOfMonth(date).toISOString().split('T')[0]
  const end = getEndOfMonth(date).toISOString().split('T')[0]
  const savedHeaders = new Headers(await headers())
  const response = await cfetch(`/expenses?start=${start}&end=${end}`, {
    method: 'GET',
    headers: savedHeaders,
  })
  if (response.status === 200) {
    expenses = await response.json()
  }
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
  return (
    <div className="custom-contaier">
      <div className="flex content-between flex-wrap gap-4 mb-10">
        <div className={cardStyle}>
          <TrendingUp size={32} stroke="#ab82d0" />
          <h1>Ganhos</h1>
          <p
            className={`font-bold text-2xl text-${getMoneyColor(summary.gain)}`}
          >
            {formatMoney(summary.gain)}
          </p>
        </div>
        <div className={cardStyle}>
          <TrendingDown size={32} stroke="#ab82d0" />
          <h1>Despesas</h1>
          <p
            className={`font-bold text-2xl text-${getMoneyColor(summary.loss)}`}
          >
            {formatMoney(summary.loss)}
          </p>
        </div>
        <div className={cardStyle}>
          <BarChart size={32} stroke="#ab82d0" />
          <h1>Total</h1>
          <p
            className={`font-bold text-2xl text-${getMoneyColor(
              summary.total,
            )}`}
          >
            {formatMoney(summary.total)}
          </p>
        </div>
      </div>

      <div className="w-full flex max-md:flex-col max-md:items-stretch justify-between items-center mb-3 gap-2">
        <div>
          <h2 className="text-lg font-semibold ">
            Despesas e ganhos cadastrados
          </h2>
          <p className="">
            {ptbrMonths[month]} de {year}
          </p>
        </div>
        <div className="w-full max-md:max-w-full max-w-[400px] relative">
          <Input
            placeholder="Pesquise por um registro..."
            tSize="sm"
            sufix={
              <IconButton
                title="Buscar registro"
                aria-label="Buscar registro"
                tSize="sm"
                type="button"
                icon={<Search size={16} />}
              />
            }
          />
        </div>
      </div>

      <div className="mb-5 relative flex flex-col w-full h-full overflow-auto rounded-lg">
        {expenses.length > 0 ? (
          <table className="w-full text-left table-auto min-w-max bg-surface-a10 shadow-md bg-clip-border">
            <thead>
              <tr>
                <th className="p-4  bg-primary-a0">
                  <p className="block text-sm font-normal leading-none ">
                    Valor
                  </p>
                </th>
                <th className="p-4  bg-primary-a0">
                  <p className="block text-sm font-normal leading-none ">Tag</p>
                </th>
                <th className="p-4  bg-primary-a0">
                  <p className="block text-sm font-normal leading-none ">
                    Data
                  </p>
                </th>
                <th className="p-4  bg-primary-a0">
                  <p className="block text-sm font-normal leading-none ">
                    Descrição
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense._id} className="hover:bg-primary-a10">
                  <td className="p-4 py-5">
                    <p
                      className={`block font-semibold text-sm text-${getMoneyColor(
                        expense.value,
                      )}`}
                    >
                      {formatMoney(expense.value)}
                    </p>
                  </td>
                  <td className="p-4 py-5">
                    <p className="text-sm ">{expense?.tag?.name ?? '--'}</p>
                  </td>
                  <td className="p-4 py-5">
                    <p className="text-sm ">
                      {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="p-4 py-5 max-w-[400px]">
                    <p className="text-sm line-clamp-3">
                      {expense.description}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="w-full text-center">
            <p>Nenhum registro encontrado</p>
          </div>
        )}
      </div>
      <div className="flex justify-end w-full max-md:justify-center">
        <Pagination />
      </div>
    </div>
  )
}

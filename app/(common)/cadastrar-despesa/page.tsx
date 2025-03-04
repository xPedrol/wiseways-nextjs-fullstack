import ExpenseForm from '@/components/molecules/ExpenseForm'
import cfetch from '@/config/fetchapi'
import { getDayjs, ptbrMonths } from '@/utils/date'
import { Metadata } from 'next'
import { headers } from 'next/headers'

export const metadata: Metadata = {
  title: 'Nova Despesa',
}
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
export default async function NewExpense({ searchParams }: Props) {
  const params = await searchParams
  const id = params?.id ? String(params.id) : null
  let expense = null
  if (id) {
    const response = await cfetch(`/expenses?id=${id}`, {
      method: 'GET',
      headers: new Headers(await headers()),
    })
    if (response.status === 200) {
      expense = await response.json()
    }
  }
  const date = getDayjs()
  const month = date.month()
  const year = date.year()
  return (
    <div className="custom-contaier">
      <div className="w-full flex max-md:flex-col max-md:items-stretch justify-between items-center mb-3 gap-2">
        <div>
          <h1 className="text-lg font-semibold ">Nova Despesa</h1>
          <p className="">
            {ptbrMonths[month]} de {year}
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-[800px]">
        <ExpenseForm expense={expense} />
      </div>
    </div>
  )
}

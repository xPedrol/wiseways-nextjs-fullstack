import ExpenseForm from '@/components/molecules/ExpenseForm'
import { ptbrMonths } from '@/utils/date'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nova Despesa',
}
export default async function NewExpense() {
  const date = new Date()
  const month = date.getMonth()
  const year = date.getFullYear()
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
        <ExpenseForm />
      </div>
    </div>
  )
}

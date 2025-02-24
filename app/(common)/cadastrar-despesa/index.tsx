import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nova Despesa',
}
export default async function NewExpense() {
  return (
    <div className="custom-container">
      <div className="w-full flex max-md:flex-col max-md:items-stretch justify-between items-center mb-3 gap-2">
        <div>
          <h3 className="text-lg font-semibold ">Nova Despesa</h3>
          <p className="">Fevereiro de 2025</p>
        </div>
      </div>
    </div>
  )
}

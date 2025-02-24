import Input from '@/components/atoms/Input'
import { Pagination } from '@/components/atoms/Pagination'
import { BarChart, Search, TrendingDown, TrendingUp } from 'lucide-react'
import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Gastos do mês',
}
const cardStyle =
  'flex-1 bg-surface-a10 px-4 py-2 rounded-lg flex flex-col min-w-[300px]'
export default async function Expenses() {
  // const session = await auth()
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
      <div className="w-full flex max-md:flex-col max-md:items-stretch justify-between items-center mb-3 gap-2">
        <div>
          <h3 className="text-lg font-semibold ">
            Despesas e ganhos cadastrados
          </h3>
          <p className="">Fevereiro de 2025</p>
        </div>
        <div className="w-full max-md:max-w-full max-w-[400px] relative">
          <Input
            placeholder="Pesquise por um registro..."
            tSize="sm"
            sufix={<Search />}
          />
        </div>
      </div>

      <div className="mb-5 relative flex flex-col w-full h-full overflow-auto bg-surface-a10 shadow-md rounded-lg bg-clip-border">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4  bg-primary-a0">
                <p className="block text-sm font-normal leading-none ">
                  Invoice Number
                </p>
              </th>
              <th className="p-4  bg-primary-a0">
                <p className="block text-sm font-normal leading-none ">
                  Customer
                </p>
              </th>
              <th className="p-4  bg-primary-a0">
                <p className="block text-sm font-normal leading-none ">
                  Amount
                </p>
              </th>
              <th className="p-4  bg-primary-a0">
                <p className="block text-sm font-normal leading-none ">
                  Issued
                </p>
              </th>
              <th className="p-4  bg-primary-a0">
                <p className="block text-sm font-normal leading-none ">
                  Due Date
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-primary-a10">
              <td className="p-4  py-5">
                <p className="block font-semibold text-sm ">INV-1001</p>
              </td>
              <td className="p-4  py-5">
                <p className="text-sm ">John Doe</p>
              </td>
              <td className="p-4  py-5">
                <p className="text-sm ">$1,200.00</p>
              </td>
              <td className="p-4  py-5">
                <p className="text-sm ">2024-08-01</p>
              </td>
              <td className="p-4  py-5">
                <p className="text-sm ">2024-08-15</p>
              </td>
            </tr>
            <tr className="hover:bg-primary-a10">
              <td className="p-4  py-5">
                <p className="block font-semibold text-sm ">INV-1002</p>
              </td>
              <td className="p-4  py-5">
                <p className="text-sm ">Jane Smith</p>
              </td>
              <td className="p-4  py-5">
                <p className="text-sm ">$850.00</p>
              </td>
              <td className="p-4  py-5">
                <p className="text-sm ">2024-08-05</p>
              </td>
              <td className="p-4  py-5">
                <p className="text-sm ">2024-08-20</p>
              </td>
            </tr>
            <tr className="hover:bg-primary-a10">
              <td className="p-4  py-5">
                <p className="block font-semibold text-sm ">INV-1003</p>
              </td>
              <td className="p-4  py-5">
                <p className="text-sm ">Acme Corp</p>
              </td>
              <td className="p-4  py-5">
                <p className="text-sm ">$2,500.00</p>
              </td>
              <td className="p-4  py-5">
                <p className="text-sm ">2024-08-07</p>
              </td>
              <td className="p-4  py-5">
                <p className="text-sm ">2024-08-21</p>
              </td>
            </tr>
            <tr className="hover:bg-primary-a10">
              <td className="p-4 py-5">
                <p className="block font-semibold text-sm ">INV-1004</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm ">Global Inc</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm ">$4,750.00</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm ">2024-08-10</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm ">2024-08-25</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-end w-full max-md:justify-center">
        <Pagination />
      </div>
    </div>
  )
}

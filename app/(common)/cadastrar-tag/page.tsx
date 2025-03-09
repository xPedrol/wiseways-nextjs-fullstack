import TagForm from '@/components/molecules/tagForm'
import { ptbrMonths } from '@/utils/date'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nova Tag',
}
export default async function NewTag() {
  const date = new Date()
  const month = date.getMonth()
  const year = date.getFullYear()
  return (
    <div className="custom-contaier mt-10">
      <div className="w-full flex max-md:flex-col max-md:items-stretch justify-between items-center mb-3 gap-2">
        <div>
          <h1 className="text-lg font-semibold ">Nova Tag</h1>
          <p className="">
            {ptbrMonths[month]} de {year}
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-[800px]">
        <TagForm />
      </div>
    </div>
  )
}

import IconButton from '@/components/atoms/IconButton'
import Input from '@/components/atoms/Input'
import { Pagination } from '@/components/atoms/Pagination'
import TagActions from '@/components/atoms/TagActions'
import cfetch from '@/config/fetchapi'
import { TTag } from '@/interfaces/tag'
import { Search } from 'lucide-react'
import { Metadata } from 'next'
import { headers } from 'next/headers'
export const metadata: Metadata = {
  title: 'Gastos do mês',
}

export default async function Tags() {
  let tags: TTag[] = []
  let count = 0
  const savedHeaders = new Headers(await headers())
  const response = await cfetch(`/tags`, {
    method: 'GET',
    headers: savedHeaders,
  })
  if (response.status === 200) {
    const data = await response.json()
    tags = data.tags
    count = data.count
  }
  return (
    <div className="custom-contaier mt-10">
      <div className="w-full flex max-md:flex-col max-md:items-stretch justify-between items-center mb-3 gap-2">
        <div>
          <h2 className="text-lg font-semibold ">Tags</h2>
          <p className="">Total de {count} tags</p>
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
        {tags.length > 0 ? (
          <table className="w-full text-left table-auto min-w-max bg-surface-a10 shadow-md bg-clip-border">
            <thead>
              <tr>
                <th className="p-4 bg-primary-a0">
                  <p className="block text-sm font-normal leading-none ">
                    Nome
                  </p>
                </th>
                <th className="p-4 bg-primary-a0">
                  <p className="block text-sm font-normal leading-none ">Cor</p>
                </th>
                <th className="p-4 bg-primary-a0">
                  <p className="block text-sm font-normal leading-none ">
                    Descrição
                  </p>
                </th>
                <th className="p-4 bg-primary-a0"></th>
              </tr>
            </thead>
            <tbody>
              {tags.map((tag) => (
                <tr key={tag._id} className="hover:bg-primary-a10">
                  <td className="p-4 py-5">
                    <p className={`text-sm`}>{tag.name}</p>
                  </td>
                  <td className="p-4 py-5">
                    <div
                      className={`w-10 h-5 rounded-lg`}
                      style={{ backgroundColor: tag.color }}
                    ></div>
                  </td>
                  <td className="p-4 py-5 max-w-[400px]">
                    <p className="text-sm line-clamp-3">{tag.description}</p>
                  </td>
                  <td className="p-4 py-5">
                    {tag?._id && (
                      <div className="w-full flex justify-end">
                        <TagActions id={tag._id} />
                      </div>
                    )}
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

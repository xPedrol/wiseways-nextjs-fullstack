'use client'

import cfetch from '@/config/fetchapi'
import Button from '../Button'
import { useRouter } from 'next/navigation'
import { PencilLine, Trash } from 'lucide-react'

type Props = {
  id: string
}
export default function TagActions({ id }: Props) {
  const router = useRouter()
  const deleteTag = async (tagId: string) => {
    const response = await cfetch(`/tags?id=${tagId}`, {
      method: 'DELETE',
    })
    if (response.status === 200) {
      router.refresh()
    } else {
      alert('Erro ao deletar tag')
    }
  }
  return (
    <>
      <Button
        title="Editar registro"
        aria-label="Editar registro"
        color="text-light-a0"
        size="sm"
        type="button"
      >
        <PencilLine size={20} />
      </Button>
      <Button
        title="Exluir registro"
        aria-label="Exluir registro"
        color="bg-transparent text-red-500"
        onClick={() => deleteTag(id)}
        size="sm"
        type="button"
      >
        <Trash size={20} />
      </Button>
    </>
  )
}

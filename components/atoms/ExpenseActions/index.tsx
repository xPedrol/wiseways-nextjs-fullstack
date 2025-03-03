'use client'

import cfetch from '@/config/fetchapi'
import Button from '../Button'
import { useRouter } from 'next/navigation'
import { PencilLine, Trash } from 'lucide-react'
import { useToast } from '@/providers/toastProvider'

type Props = {
  id: string
}
export default function ExpenseActions({ id }: Props) {
  const router = useRouter()
  const { showToast } = useToast()
  const deleteExpense = async (expenseId: string) => {
    const response = await cfetch(`/expenses?id=${expenseId}`, {
      method: 'DELETE',
    })
    if (response.status === 200) {
      router.refresh()
    } else {
      showToast('Falha ao deletar registro', 'error')
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
        onClick={() => deleteExpense(id)}
        size="sm"
        type="button"
      >
        <Trash size={20} />
      </Button>
    </>
  )
}

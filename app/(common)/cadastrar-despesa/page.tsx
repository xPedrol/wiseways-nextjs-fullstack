import Button from '@/components/atoms/Button'
import Fieldset from '@/components/atoms/Fieldset'
import Input from '@/components/atoms/Input'
import Label from '@/components/atoms/Label'
import Select from '@/components/atoms/Select'
import SelectOption from '@/components/atoms/SelectOption'
import Textarea from '@/components/atoms/Textarea'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nova Despesa',
}
export default async function NewExpense() {
  return (
    <div className="custom-contaier">
      <div className="w-full flex max-md:flex-col max-md:items-stretch justify-between items-center mb-3 gap-2">
        <div>
          <h3 className="text-lg font-semibold ">Nova Despesa</h3>
          <p className="">Fevereiro de 2025</p>
        </div>
      </div>
      <div>
        <form className="flex gap-2 flex-col">
          <div className="flex flex-row flex-wrap gap-2">
            <Fieldset className="flex-1">
              <Label>Valor</Label>
              <Input type="text" placeholder="Digite o valor..." />
            </Fieldset>
            <Fieldset className="flex-1">
              <Label>Data</Label>
              <Input type="date" />
            </Fieldset>
            <Fieldset className="flex-1">
              <Label>Tag</Label>
              <Select>
                <SelectOption>Teste 1</SelectOption>
                <SelectOption>Teste 1</SelectOption>
                <SelectOption>Teste 1</SelectOption>
              </Select>
            </Fieldset>
          </div>
          <Fieldset>
            <Label>Descrição</Label>
            <Textarea rows={6} placeholder="Digite a descrição..." />
          </Fieldset>
          <div className="text-end">
            <Button>Salvar</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

import LoginForm from '@/components/molecules/LoginForm'

export default async function Entrar() {
  return (
    <div className="flex items-center justify-center w-[100vw] h-full min-h-[100vh]">
      <div className="bg-surface-a0 rounded-2xl shadow-2xl shadow-primary-a0 p-8 flex flex-col w-[100%] max-w-[400px]  max-sm:m-4 gap-6">
        <h1 className="font-roboto-condensed text-4xl font-bold">Wise Ways</h1>
        <LoginForm />
      </div>
    </div>
  )
}

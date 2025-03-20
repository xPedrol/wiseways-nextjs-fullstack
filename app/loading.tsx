import Spinner from '@/components/atoms/Spinner'

export default function Loading() {
  return (
    <section className="h-[80dvh] flex flex-col items-center justify-center gap-2">
      <Spinner />
      <span>Carregando...</span>
    </section>
  )
}

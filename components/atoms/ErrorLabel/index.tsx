type TProps = {
  children: React.ReactNode
}
export default function ErrorLabel({ children }: TProps) {
  return <p className="text-red-300 text-sm">{children}</p>
}

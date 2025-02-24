export type TLogin = {
  password: string
  email: string
}
export type TRegister = {
  name: string
} & TLogin

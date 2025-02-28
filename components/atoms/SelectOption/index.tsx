import React from 'react'
type OptionProps = React.OptionHTMLAttributes<HTMLOptionElement> & {
  children: React.ReactNode
}
export default function SelectOption({ children, ...rest }: OptionProps) {
  return <option {...rest}>{children}</option>
}

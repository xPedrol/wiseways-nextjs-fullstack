import React from 'react'
type FieldsetProps = React.FieldsetHTMLAttributes<HTMLFieldSetElement>
export default function Fieldset({ ...rest }: FieldsetProps) {
  return (
    <fieldset
      className="border-none flex flex-col w-[100%]"
      {...rest}
    ></fieldset>
  )
}

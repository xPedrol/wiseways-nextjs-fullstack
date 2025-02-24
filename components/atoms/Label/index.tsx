import React from 'react'
type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean
  children: string
}
export default function Label({
  children,
  required = false,
  ...rest
}: LabelProps) {
  return (
    <label className="text-sm" {...rest}>
      {children}
      {required && <span className="ms-1 text-red-500">*</span>}
    </label>
  )
}

import React from 'react'
type InputProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  tSize?: 'sm' | 'md'
}
export default function Textarea({ tSize = 'md', ...rest }: InputProps) {
  let inputClass = tSize === 'md' ? 'py-3 text-md' : 'py-2 text-sm'
  return (
    <textarea
      {...rest}
      className={`${inputClass} min-w-[350px] bg-surface-a10 w-full pl-3 placeholder-surface-a50 border border-surface-a10 rounded-lg transition duration-300 ease focus:outline-none focus:border-primary-a0 hover:border-primary-a0 shadow-sm focus:shadow-md`}
    ></textarea>
  )
}

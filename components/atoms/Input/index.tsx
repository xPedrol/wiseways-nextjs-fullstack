import React from 'react'
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  sufix?: React.ReactNode
  tSize?: 'sm' | 'md'
}
export default function Input({ sufix, tSize = 'md', ...rest }: InputProps) {
  let inputClass = tSize === 'md' ? 'py-3 text-md' : 'py-2 text-sm'
  inputClass += sufix ? ' pr-11' : ' pr-3'
  return (
    <div className="relative">
      <input
        {...rest}
        className={`${inputClass} text-white bg-surface-a10 w-full pl-3 placeholder-surface-a50 border border-surface-a10 rounded-lg transition duration-300 ease focus:outline-none focus:border-primary-a0 hover:border-primary-a0 shadow-sm focus:shadow-md`}
      />
      {sufix && sufix}
    </div>
  )
}

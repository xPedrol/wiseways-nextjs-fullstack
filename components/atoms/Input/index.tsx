import React from 'react'
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  sufix?: React.ReactNode
  tSize?: 'sm' | 'md'
}
export default function Input({ sufix, tSize = 'md', ...rest }: InputProps) {
  let inputClass = tSize === 'md' ? 'text-md h-12' : 'text-sm h-9'
  inputClass += sufix ? ' pr-11' : ' pr-3'
  return (
    <div className="relative">
      <input
        {...rest}
        className={`${inputClass} read-only:focus:border-surface-a10 read-only:hover:border-surface-a10 read-only:bg-surface-a0 read-only:text-surface-a50 read-only:cursor-not-allowed bg-surface-a10 w-full pl-3 placeholder-surface-a50 border border-surface-a10 rounded-lg transition duration-300 ease focus:outline-none focus:border-primary-a0 hover:border-primary-a0 shadow-sm focus:shadow-md`}
      />
      {sufix && sufix}
    </div>
  )
}

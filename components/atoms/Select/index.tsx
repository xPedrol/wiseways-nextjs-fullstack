import React from 'react'
type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  tSize?: 'sm' | 'md'
  children?: React.ReactNode | React.ReactNode[] | ''
}
export default function Select({
  children,
  tSize = 'md',
  ...rest
}: SelectProps) {
  const inputClass = tSize === 'md' ? 'text-md h-12' : 'text-sm h-9'
  return (
    <div className="relative">
      <select
        {...rest}
        className={`${inputClass} text-white bg-surface-a10 w-full pl-3 placeholder-surface-a50 border border-surface-a10 rounded-lg transition duration-300 ease focus:outline-none focus:border-primary-a0 hover:border-primary-a0 shadow-sm focus:shadow-md`}
      >
        {children}
      </select>
    </div>
  )
}

import React from 'react'
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  sufix?: React.ReactNode
  tSize?: 'sm' | 'md'
}
export default function Input({ sufix, tSize = 'md', ...rest }: InputProps) {
  let inputClass = ''
  let buttonClass = ''
  if (tSize === 'md') {
    inputClass = 'py-3 text-md'
    buttonClass = 'right-2 top-2'
  } else {
    inputClass = 'py-2 text-sm'
    buttonClass = 'right-1 top-1'
  }
  if (sufix) {
    inputClass += ' pr-11'
  } else {
    inputClass += ' pr-3'
  }
  return (
    // <div className="relative">
    //   <input
    //     {...rest}
    //     className="bg-surface-a10 placeholder-surface-a50 rounded-xl w-[100%] px-2 py-3"
    //   />
    //   {sufix && (
    //     <span className="absolute top-4 right-4 text-surface-a50">{sufix}</span>
    //   )}
    // </div>
    <div className="relative">
      <input
        {...rest}
        className={`${inputClass} text-white min-w-[350px] bg-surface-a10 w-full pl-3 placeholder-surface-a50 border border-surface-a10 rounded-lg transition duration-300 ease focus:outline-none focus:border-primary-a0 hover:border-primary-a0 shadow-sm focus:shadow-md`}
      />
      {sufix && (
        <button
          className={`${buttonClass} absolute h-8 w-8 my-auto px-2 flex items-center bg-primary-a0 rounded-lg`}
          type="button"
        >
          {sufix}
        </button>
      )}
    </div>
  )
}

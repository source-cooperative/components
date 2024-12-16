import React from 'react'

type SVGProps = {
  children: React.ReactNode
  title?: string
} & React.SVGProps<SVGSVGElement>

export default function SVG({ title, children, ...props }: SVGProps) {
  return (
    <svg stroke="none" {...props}>
      {title ? <title>{title}</title> : <></>}
      {children}
    </svg>
  )
}

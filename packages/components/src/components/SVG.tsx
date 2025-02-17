import React from 'react'
import { SxProp } from '../lib/sx'

export type OptionalSVGProps = {
 title?: string
} & React.SVGProps<SVGSVGElement> & SxProp

type SVGProps = {
  children: React.ReactNode
} & OptionalSVGProps

export default function SVG({ title, children, ...props }: SVGProps) {
  return (
    <svg stroke="none" {...props}>
      {title ? <title>{title}</title> : <></>}
      {children}
    </svg>
  )
}

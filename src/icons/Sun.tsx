// @ts-nocheck
import React from 'react'
import { Box } from 'theme-ui'

const Sun = ({ ...props }) => {
  const style = { vectorEffect: 'non-scaling-stroke' }
  return (
    <Box
      as='svg'
      viewBox='0 0 24 24'
      fill='none'
      width='24'
      height='24'
      stroke='currentColor'
      strokeWidth='1.5'
      {...props}
    >
      <circle cx='12' cy='12' r='4.77' />
      <line x1='12' x2='12' y2='4.06' />
      <line x1='12' y1='19.94' x2='12' y2='24' />
      <line x1='20.49' y1='3.51' x2='17.61' y2='6.39' />
      <line x1='6.39' y1='17.61' x2='3.51' y2='20.49' />
      <line x1='20.49' y1='20.49' x2='17.61' y2='17.61' />
      <line x1='6.39' y1='6.39' x2='3.51' y2='3.51' />
      <line x1='24' y1='12' x2='19.94' y2='12' />
      <line x1='4.06' y1='12' y2='12' />
    </Box>
  )
}

export default Sun
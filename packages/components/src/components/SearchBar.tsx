import React from 'react'
import { Box, Grid, Input } from 'theme-ui'
import Button from './Button.js'

interface SearchBarProps {
  placeholder?: string;
  defaultValue?: string;
  buttonText?: string;
  handleSubmit?: (val: string) => void;
}

const defaultProps = {
  placeholder: 'Search',
  defaultValue: null,
  buttonText: 'Browse',
  handleSubmit: null,
}

function SearchBar(props: SearchBarProps) {
  const { placeholder, defaultValue, buttonText, handleSubmit } = props

  function submitForm(form: HTMLFormElement) {
    const formData = new FormData(form)
    const query = formData.get('query')

    if (handleSubmit && query && typeof query === 'string') {
      handleSubmit(query)
    }
  }
  function onFormSubmit(e: React.FormEvent) {
    e.stopPropagation()
    e.preventDefault()
    const form = e.currentTarget

    if (form instanceof HTMLFormElement) {
      submitForm(form)
    }
  }
  function onButtonClick(e: React.MouseEvent) {
    e.stopPropagation()
    e.preventDefault()
    const element = e.currentTarget
    const form = element.parentElement?.parentElement
    if (form && form instanceof HTMLFormElement) {
      submitForm(form)
    }
  }

  return (
    <Box as="form" onSubmit={onFormSubmit} sx={{ width: '100%' }}>
      <Grid sx={{ gridGap: 3, gridTemplateColumns: 'auto max-content' }}>
        <Input
          placeholder={placeholder}
          name="query"
          defaultValue={defaultValue}
        />
        <Button variant="nav" onClick={onButtonClick}>
          {buttonText}
        </Button>
      </Grid>
    </Box>
  )
}
SearchBar.defaultProps = defaultProps

export default SearchBar

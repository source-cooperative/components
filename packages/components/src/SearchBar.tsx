import { FormEvent, MouseEvent } from 'react'
import { Box, Grid, Input } from 'theme-ui'
import Button from './Button'
import { SxProp } from './sx'

type SearchBarProps = {
	placeholder?: string;
	defaultValue?: string;
	buttonText?: string;
	handleSubmit?: (val: string) => void;
} & SxProp

export default function SearchBar( { placeholder = 'Search', defaultValue, buttonText = 'Browse', handleSubmit, sx, css, className }: SearchBarProps) {

  function submitForm(form: HTMLFormElement) {
    const formData = new FormData(form)
    const query = formData.get('query')
    if (handleSubmit && query && typeof query === 'string') {
      handleSubmit(query)
    }
  }
  function onFormSubmit(e: FormEvent) {
    e.stopPropagation()
    e.preventDefault()
    const form = e.currentTarget

    if (form instanceof HTMLFormElement) {
      submitForm(form)
    }
  }
  function onButtonClick(e: MouseEvent) {
    e.stopPropagation()
    e.preventDefault()
    const element = e.currentTarget
    const form = element.parentElement?.parentElement
    if (form && form instanceof HTMLFormElement) {
      submitForm(form)
    }
  }

  return (
    <Box as="form" onSubmit={onFormSubmit} sx={{ width: '100%', ...sx }} css={css} className={className}>
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

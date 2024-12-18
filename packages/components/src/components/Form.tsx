import { ResponsiveStyleValue } from '@theme-ui/css'
import type { Property } from 'csstype'
import { FormEvent, ReactNode, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import {
  Box,
  Checkbox,
  Grid,
  Input,
  Label,
  Select,
  Text,
  Textarea,
} from 'theme-ui'
import type { FieldStateValue, FieldTypeValue, FormResultStateValue } from '../lib/enums'
import { FieldState, FieldType, FormResultState } from '../lib/enums'
import Button from './Button'

export interface FormFieldState {
  state: FieldStateValue;
  message?: string;
}

interface FormFieldData {
	type: FieldTypeValue;
	title: string;
	id: string;
	defaultValue?: string;
	required?: boolean;
	showRequired?: boolean;
	columnStart?: Property.GridColumnStart;
	columnEnd?: Property.GridColumnEnd;
	properties?: {options?: {value: string; text: string}[]};
	state: FormFieldState;
	setState: (state: FormFieldState) => void;
	onLoad?: () => void;
	validationDelay?: number;
	onValidation?: (val: string) => void;
}

export interface FormResult {
	state: FormResultStateValue;
	message?: string;
	onSuccess?: () => void;
}

interface FormProps {
	fields: FormFieldData[];
	gridColumns?: ResponsiveStyleValue<string | number>;
	active?: boolean;
	submitText?: string;
	onSubmit: (values: Record<string, string>) => Promise<FormResult>;
}

const defaultProps = {
  gridColumns: ['auto'],
  active: true,
}

function getFieldMessage(field: FormFieldData): ReactNode {
  if (!field.state.message) {
    return <></>
  }
  const color = field.state.state === FieldState.INVALID ? 'red' :
    field.state.state === FieldState.WARNING || field.state.state === FieldState.VALIDATING ? 'orange' :
      'green'

  return <Text sx={{
    color,
    fontFamily: 'mono',
    fontSize: 0,
  }}>{field.state.message}</Text>
}

function getInputElement(field: FormFieldData, onValueChange: (value: string) => void): ReactNode {
  switch (field.type) {
  case FieldType.TEXT:
    return <Input
      onChange={(e) => {
        onValueChange(e.target.value)
      }}
      defaultValue={field.defaultValue}
      name={field.id}
      id={field.id}
    />
  case FieldType.PASSWORD:
    return <Input
      onChange={(e) => {
        onValueChange(e.target.value)
      }}
      defaultValue={field.defaultValue}
      name={field.id}
      id={field.id}
      type="password"
    />
  case FieldType.EMAIL:
    return <Input
      onChange={(e) => {
        onValueChange(e.target.value)
      }}
      defaultValue={field.defaultValue}
      name={field.id}
      id={field.id}
      type="email"
    />
  case FieldType.SELECT:
    return <Select
      defaultValue={field.defaultValue}
      name={field.id}
      id={field.id}
      onChange={(e) => {
        onValueChange(e.target.value)
      }}
    >
      {
        (field.properties?.options ?? []).map((option, i) => {
          return (
            <option
              key={`form-field-select-${i}`}
              value={option.value}
              selected={field.defaultValue === option.value}
            >
              {option.text}
            </option>
          )
        })
      }
    </Select>
  case FieldType.TEXTAREA:
    return <Textarea
      name={field.id}
      id={field.id}
      defaultValue={field.defaultValue}
      onChange={(e) => {
        onValueChange(e.target.value)
      }}
    />
  case FieldType.CHECKBOX:
    return <Box
      sx={{
        gridColumnStart: field.columnStart,
        gridColumnEnd: field.columnEnd,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Label>
        <Checkbox
          onChange={(e) => {
            onValueChange(e.target.checked ? 'checked' : 'not_checked')
          }}
          defaultChecked={field.defaultValue === 'checked'}
          name={field.id}
          id={field.id}
        />
        {field.title}
        {field.required && field.showRequired ?
          <Text sx={{ color: 'red', pl: 1 }}>*</Text>
          :
          <></>
        }
      </Label>
    </Box>
  default:
    return <></>
  }
}

function FormField(field: FormFieldData) {
  const setTimeoutId = useState<ReturnType<typeof setTimeout> | undefined>(undefined)[1]
  const setHasLoaded = useState(false)[1]

  const onValueChange = useCallback(
    (value: string) => {
      if (value === '' && field.required) {
        field.setState({
          state: FieldState.INVALID,
          message: undefined,
        })
        return
      }

      if (value === '' && !field.required) {
        field.setState({
          state: FieldState.VALID,
          message: undefined,
        })
        return
      }

      if (
        field.type === FieldType.CHECKBOX &&
			field.required) {
        if (value === 'checked') {
          field.setState({
            state: FieldState.VALID,
            message: undefined,
          })
        } else if (value === 'not_checked') {
          field.setState({
            state: FieldState.INVALID,
            message: undefined,
          })
        }
      }

      if (!field.onValidation) {
        return
      }

      setTimeoutId(timeoutId => {
        clearTimeout(timeoutId)
        return setTimeout(
          () => { field.onValidation?.(value) },
          field.validationDelay ? field.validationDelay : 1000,
        )
      })
    },
    [field, setTimeoutId],
  )

  useEffect(() => {
    setHasLoaded((hasLoaded) => {
      if (hasLoaded) {
        return true
      }
      field.onLoad?.()
      onValueChange(field.defaultValue ? field.defaultValue : '')
      return true
    })
  }, [ field, onValueChange, setHasLoaded ])

  return (
    <Box
      sx={{
        gridColumnStart: field.columnStart,
        gridColumnEnd: field.columnEnd,
      }}
    >
      <Label htmlFor={field.id}>
        {field.title}
        {field.required && field.showRequired ?
          <Text sx={{ color: 'red' }}>*</Text>
				 :
          <></>
        }
      </Label>
      {getInputElement(field, onValueChange)}
      {getFieldMessage(field)}
    </Box>
  )
}

export default function Form(props: FormProps) {
  const { fields, gridColumns, active, submitText, onSubmit } = props
  const [submitting, setSubmitting] = useState(false)
  const [submittable, setSubmittable] = useState(false)

  useEffect(() => {
    let submittable = true
    fields.forEach((field) => {
      if (
        field.state.state === FieldState.INVALID ||
				field.state.state === FieldState.VALIDATING
      ) {
        submittable = false
      }
    })

    setSubmittable(submittable)
  }, [fields])

  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    e.stopPropagation()

    setSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const values: Record<string, string> = {}
    fields.forEach((field) => {
      const name = field.id
      const value = formData.get(name)
      if (value === null || value instanceof File) {
        /// file upload is not supported
        return
      }
      values[field.id] = value
    })

    onSubmit(values).then((result) => {
      if (result.state === FormResultState.SUCCESS) {
        result.onSuccess?.()
      } else {
        toast.error(result.message ?? 'An error occurred while submitting the form')
      }
      setSubmitting(false)
    }).catch((e: unknown) => { console.error(e) })
  }

  return (
    <Box as="form" onSubmit={(e) => { submitHandler(e as unknown as FormEvent<HTMLFormElement>) }}>
      <Grid columns={gridColumns} gap={3} mb={3}>
        {fields.map((field, i) => {
          return <FormField key={`form-field-${i}`} {...field} />
        })}
      </Grid>
      <Button disabled={!active || submitting || !submittable}>
        {submitText ? submitText : 'Submit'}
      </Button>
    </Box>
  )
}

Form.defaultProps = defaultProps

import { ResponsiveStyleValue } from '@theme-ui/css'
import type { Property } from 'csstype'
import { FormEvent, useEffect, useState } from 'react'
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
import { FieldState, FieldType, FormResultState } from '../lib/enums.js'
import Button from './Button.js'

export interface FormFieldState {
  state: FieldState;
  message?: string;
}

interface FormFieldData {
  type: FieldType;
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
  state: FormResultState;
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

function FormField(field: FormFieldData) {
  let fieldMessage = null

  if (field.state.state === FieldState.INVALID && field.state.message) {
    fieldMessage =
      <Text sx={{ color: 'red', fontFamily: 'mono', fontSize: 0 }}>
        {field.state.message}
      </Text>

  }

  if (
    (field.state.state === FieldState.WARNING ||
      field.state.state === FieldState.VALIDATING) &&
    field.state.message
  ) {
    fieldMessage =
      <Text sx={{ color: 'orange', fontFamily: 'mono', fontSize: 0 }}>
        {field.state.message}
      </Text>

  }

  if (field.state.state === FieldState.VALID && field.state.message) {
    fieldMessage =
      <Text sx={{ color: 'green', fontFamily: 'mono', fontSize: 0 }}>
        {field.state.message}
      </Text>

  }

  const [value, setValue] = useState(
    field.defaultValue ? field.defaultValue : '',
  )

  useEffect(() => {
    if (field.onLoad) {
      field.onLoad()
    }
  }, [field])

  useEffect(() => {
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
      field.required &&
      value === 'checked'
    ) {
      field.setState({
        state: FieldState.VALID,
        message: undefined,
      })
    } else if (
      field.type === FieldType.CHECKBOX &&
      field.required &&
      value === 'not_checked'
    ) {
      field.setState({
        state: FieldState.INVALID,
        message: undefined,
      })
    }

    const { onValidation } = field
    if (!onValidation) {
      return
    }

    const timeoutId = setTimeout(
      () => { onValidation(value) },
      field.validationDelay ? field.validationDelay : 1000,
    )
    return () => { clearTimeout(timeoutId) }
  }, [value, field])

  let inputElement

  if (field.type === FieldType.TEXT) {
    inputElement =
      <Input
        onChange={(e) => {
          setValue(e.target.value)
        }}
        defaultValue={field.defaultValue}
        name={field.id}
        id={field.id}
      />

  }

  if (field.type === FieldType.PASSWORD) {
    inputElement =
      <Input
        onChange={(e) => {
          setValue(e.target.value)
        }}
        defaultValue={field.defaultValue}
        name={field.id}
        id={field.id}
        type="password"
      />

  }

  if (field.type === FieldType.EMAIL) {
    inputElement =
      <Input
        onChange={(e) => {
          setValue(e.target.value)
        }}
        defaultValue={field.defaultValue}
        name={field.id}
        id={field.id}
        type="email"
      />

  }

  if (field.type === FieldType.SELECT) {
    inputElement =
      <Select
        defaultValue={field.defaultValue}
        name={field.id}
        id={field.id}
        onChange={(e) => {
          setValue(e.target.value)
        }}
      >
        {field.properties?.options ?
          field.properties.options.map((option, i) => {
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
          :
          <></>
        }
      </Select>

  }

  if (field.type === FieldType.TEXTAREA) {
    inputElement =
      <Textarea
        name={field.id}
        id={field.id}
        defaultValue={field.defaultValue}
        onChange={(e) => {
          setValue(e.target.value)
        }}
      />

  }

  if (field.type === FieldType.CHECKBOX) {
    return (
      <Box
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
              setValue(e.target.checked ? 'checked' : 'not_checked')
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
    )
  }

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
      {inputElement}
      {fieldMessage ? fieldMessage : <></>}
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

    const values: Record<string, string> = {}

    const { elements } = e.currentTarget
    fields.forEach((field) => {
      const name = field.id
      const element = elements.namedItem(name)
      values[field.id] = element && 'value' in element ? element.value : ''
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

import BaseLayout from '@source-cooperative/components/components/BaseLayout.js'
import Form, { FormResult } from '@source-cooperative/components/components/Form.js'
import { FieldState, FieldStateValue, FieldType, FormResultState } from '@source-cooperative/components/lib/enums.js'
import { useState } from 'react'
import { Heading } from 'theme-ui'
import { sideNavLinks } from '../../utils/constants'

interface FormFieldState { state: FieldStateValue; message?: string }

export default function FormPage() {
  const [usernameState, setUsernameState] = useState<FormFieldState>({
    state: FieldState.INVALID,
    message: undefined,
  })
  const [passwordState, setPasswordState] = useState<FormFieldState>({
    state: FieldState.INVALID,
    message: undefined,
  })
  const [accountState, setAccountState] = useState<FormFieldState>({
    state: FieldState.VALID,
    message: undefined,
  })
  const [tosState, setTosState] = useState<FormFieldState>({
    state: FieldState.INVALID,
    message: undefined,
  })
  const [tagsState, setTagsState] = useState<FormFieldState>({
    state: FieldState.INVALID,
    message: undefined,
  })

  const fields = [
    {
      id: 'email',
      required: true,
      type: FieldType.EMAIL,
      title: 'E-Mail',
      defaultValue: 'kevin@kb.gg',
      state: usernameState,
      validationDelay: 500,
      setState: (state: FormFieldState) => {
        setUsernameState({
          state: state.state,
          message: state.message,
        })
      },
      onValidation: (val: string) => {
        setUsernameState({
          state: FieldState.VALIDATING,
          message: 'Checking username availability...',
        })

        setTimeout(() => {
          setUsernameState({
            state: FieldState.VALID,
            message: `${val} is available!`,
          })
        }, 1000)
      },
    },
    {
      id: 'password',
      required: true,
      type: FieldType.PASSWORD,
      title: 'Password',
      state: passwordState,
      validationDelay: 1,
      setState: (state: FormFieldState) => {
        setPasswordState({
          state: state.state,
          message: state.message,
        })
      },
      onValidation: (val: string) => {
        setPasswordState({
          state: FieldState.VALID,
          message: `${val} is available!`,
        })
      },
    },
    {
      id: 'account_id',
      required: false,
      type: FieldType.SELECT,
      title: 'Account ID',
      state: accountState,
      validationDelay: 1,
      setState: (state: FormFieldState) => {
        setAccountState({
          state: state.state,
          message: state.message,
        })
      },
      onValidation: (val: string) => {
        setAccountState({
          state: FieldState.VALID,
          message: `${val} is available!`,
        })
      },
      properties: {
        options: [
          {
            value: 'kbgg',
            text: '@kbgg',
          },
          {
            value: 'radiantearth',
            text: '@radiantearth',
          },
        ],
      },
    },
    {
      id: 'tags',
      required: false,
      type: FieldType.TEXTAREA,
      title: 'Tags',
      state: tagsState,
      validationDelay: 1,
      columnStart: 0,
      columnEnd: 2,
      setState(state: FormFieldState) {
        setTagsState({
          state: state.state,
          message: state.message,
        })
      },
    },
    {
      id: 'tos',
      required: true,
      showRequired: true,
      type: FieldType.CHECKBOX,
      title: 'Terms of Service',
      state: tosState,
      validationDelay: 1,
      columnStart: 0,
      columnEnd: 2,
      setState(state: FormFieldState) {
        setTosState({
          state: state.state,
          message: state.message,
        })
      },
    },
  ]

  function onSubmit(values: Record<string, string>): Promise<FormResult> {
    console.log(values)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          state: FormResultState.FAILURE,
          message: 'Failed to submit form',
        })
      }, 1000)
    })
  }

  return (
    <BaseLayout sideNavLinks={sideNavLinks}>
      <Heading as="h1">Form</Heading>
      <Form
        onSubmit={onSubmit}
        gridColumns={['auto', 'auto', '1fr 1fr', '1fr 1fr']}
        fields={fields}
      />
    </BaseLayout>
  )
}

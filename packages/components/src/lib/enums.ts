export const FieldState = {
  VALID: 'VALID',
  VALIDATING: 'VALIDATING',
  INVALID: 'INVALID',
  WARNING: 'WARNING',
} as const
export type FieldStateValue = typeof FieldState[keyof typeof FieldState]

export const FieldType = {
  TEXT: 'TEXT',
  EMAIL: 'EMAIL',
  PASSWORD: 'PASSWORD',
  SELECT: 'SELECT',
  CHECKBOX: 'CHECKBOX',
  TEXTAREA: 'TEXTAREA',
} as const
export type FieldTypeValue = typeof FieldType[keyof typeof FieldType]

export const FormResultState = {
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
} as const
export type FormResultStateValue = typeof FormResultState[keyof typeof FormResultState]

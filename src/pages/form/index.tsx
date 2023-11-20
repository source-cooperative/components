import { Layout } from "../../components/Layout";
import Browser from "../../components/Browser";
import { Box, Field, Heading } from "theme-ui";
import { sideNavLinks } from "../../utils/constants";
import Form from "@/components/Form";
import { FieldType, FieldState, FormResult, FormResultState } from "@/components/Form";
import { useState } from "react";
import Button from "@/components/Button";

export default function FormPage() {
  const [usernameState, setUsernameState] = useState({
    state: FieldState.INVALID,
    message: null,
  })
  const [passwordState, setPasswordState] = useState({
    state: FieldState.INVALID,
    message: null,
  })
  const [accountState, setAccountState] = useState({
    state: FieldState.VALID,
    message: null,
  })
  const [tosState, setTosState] = useState({
    state: FieldState.INVALID,
    message: null,
  })
  const [tagsState, setTagsState] = useState({
    state: FieldState.INVALID,
    message: null,
  })

  var fields = [
    {
      id: "email",
      required: true,
      type: FieldType.EMAIL,
      title: "E-Mail",
      defaultValue: "kevin@kb.gg",
      state: usernameState,
      validationDelay: 500,
      setState: (state: {state: FieldState, message?: string}) => {
        setUsernameState({
          state: state.state,
          message: state.message
        }) 
      },
      onValidation: (val: string) => {
        setUsernameState({
          state: FieldState.VALIDATING,
          message: "Checking username availability..."
        })

        setTimeout(() => {
          setUsernameState({
            state: FieldState.VALID,
            message: `${val} is available!`
          })
        }, 1000)
      }
    },
    {
      id: "password",
      required: true,
      type: FieldType.PASSWORD,
      title: "Password",
      state: passwordState,
      validationDelay: 1,
      setState: (state: {state: FieldState, message?: string}) => {
        setPasswordState({
          state: state.state,
          message: state.message
        }) 
      },
      onValidation: (val: string) => {
        setPasswordState({
          state: FieldState.VALID,
          message: `${val} is available!`
        })
      }
    },
    {
      id: "account_id",
      required: false,
      type: FieldType.SELECT,
      title: "Account ID",
      state: accountState,
      validationDelay: 1,
      setState: (state: {state: FieldState, message?: string}) => {
        setAccountState({
          state: state.state,
          message: state.message
        }) 
      },
      onValidation: (val: string) => {
        setAccountState({
          state: FieldState.VALID,
          message: `${val} is available!`
        })
      },
      properties: {
        options: [
          {
            value: "kbgg",
            text: "@kbgg"
          },
          {
            value: "radiantearth",
            text: "@radiantearth"
          }
        ]
      }
    },
    {
      id: "tags",
      required: false,
      type: FieldType.TEXTAREA,
      title: "Tags",
      state: tagsState,
      validationDelay: 1,
      columnStart: 0,
      columnEnd: 2,
      setState(state: {state: FieldState, message?: string}) {
        setTagsState({
          state: state.state,
          message: state.message
        })
      }
    },
    {
      id: "tos",
      required: true,
      showRequired: true,
      type: FieldType.CHECKBOX,
      title: "Terms of Service",
      state: tosState,
      validationDelay: 1,
      columnStart: 0,
      columnEnd: 2,
      setState(state: {state: FieldState, message?: string}) {
        setTosState({
          state: state.state,
          message: state.message
        })
      },
    }
  ];


  function onSubmit(values: {[key: string]: string}): Promise<FormResult> {
    console.log(values)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          state: FormResultState.FAILURE,
          message: "Failed to submit form"
        })
      }, 1000)
    })
  }

  return (
    <>
      <Layout sideNavLinks={sideNavLinks}>
        <Heading as="h1">Form</Heading>
        <Form onSubmit={onSubmit} gridColumns={["auto", "auto", "1fr 1fr", "1fr 1fr"]} fields={fields} />
      </Layout>
    </>
  );
}
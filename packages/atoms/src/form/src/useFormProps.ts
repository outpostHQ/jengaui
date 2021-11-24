import { createContext, useContext } from 'react'

export const FormContext = createContext({})

export function useFormProps(props) {
  const ctx = useContext(FormContext)

  return { ...ctx, ...props }
}

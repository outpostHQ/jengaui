import { createContext, useContext } from 'react';

import { AccordionContextType, AccordionProviderProps } from './types';

const AccordionContext = createContext<AccordionContextType | null>(null);

export function AccordionProvider(props: AccordionProviderProps) {
  const { children, isLazy } = props;

  return (
    <AccordionContext.Provider value={{ isLazy }}>
      {children}
    </AccordionContext.Provider>
  );
}

export function useAccordionContext() {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error(
      'useAccordionContext must be used within a AccordionProvider',
    );
  }

  return context;
}

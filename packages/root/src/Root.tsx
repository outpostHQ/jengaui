import { useEffect, useRef, useState } from 'react';
import { ModalProvider } from '@react-aria/overlays';
import { StyleSheetManager } from 'styled-components';

import {
  BASE_STYLES,
  BaseProps,
  BLOCK_STYLES,
  extractStyles,
  filterBaseProps,
  tasty,
} from 'tastycss';
import { Provider } from '@jenga-ui/providers';
import { TOKENS } from '@jenga-ui/core/src/tokens';

import { PortalProvider } from '@jenga-ui/portal';
import { GlobalStyles } from '@jenga-ui/core';
import { AlertDialogApiProvider } from '@jenga-ui/alert-dialog';
import { NotificationsProvider } from '@jenga-ui/new-notifications';

const RootElement = tasty({
  id: 'jenga-ui-kit-root',
  className: 'root',
});

const DEFAULT_STYLES = {
  display: 'block',
  preset: 't3',
  ...Object.keys(TOKENS).reduce((map, key) => {
    map[`@${key}`] = TOKENS[key];

    return map;
  }, {}),
};
const STYLES = [...BASE_STYLES, ...BLOCK_STYLES];

export interface JengaRootProps extends BaseProps {
  tokens?: { [key: string]: string };
  bodyStyles?: { [key: string]: string };
  fonts?: boolean;
  publicUrl?: string;
  router?: any;
  font?: string;
  monospaceFont?: string;
  applyLegacyTokens?: boolean;
}

export function Root(allProps: JengaRootProps) {
  let {
    children,
    /** Raw css styles for body element */
    bodyStyles,
    fonts,
    publicUrl,
    router,
    font,
    monospaceFont,
    applyLegacyTokens,
    ...props
  } = allProps;

  const ref = useRef(null);

  const [rootRef, setRootRef] = useState();

  useEffect(() => {
    if (!rootRef) {
      // @ts-ignore
      setRootRef(ref?.current);
    }
  }, []);

  const styles = extractStyles(props, STYLES, DEFAULT_STYLES);

  return (
    <Provider router={router} root={rootRef}>
      <StyleSheetManager disableVendorPrefixes>
        <RootElement
          ref={ref}
          {...filterBaseProps(props, { eventProps: true })}
          styles={styles}
        >
          <GlobalStyles
            bodyStyles={bodyStyles}
            applyLegacyTokens={applyLegacyTokens}
            publicUrl={publicUrl}
            fonts={fonts}
            font={font}
            monospaceFont={monospaceFont}
          />
          <ModalProvider>
            <PortalProvider value={ref}>
              <NotificationsProvider rootRef={ref}>
                <AlertDialogApiProvider>{children}</AlertDialogApiProvider>
              </NotificationsProvider>
            </PortalProvider>
          </ModalProvider>
        </RootElement>
      </StyleSheetManager>
    </Provider>
  );
}
import { useTable } from '@react-aria/table';
import { useTableState } from '@react-stately/table';
import { useProviderProps } from '@jengaui/providers';
import { forwardRef, ReactElement, useRef } from 'react';
import { useCombinedRefs } from '@jengaui/utils';

import { TableBase, TableWrapper } from './TableElementsBase';
import { TableHeadSection } from './TableHeadSection';
import { TableBodySection } from './TableBodySection';
import { JengaTableExtendedProps, JengaTableProps } from './types';
import { TableFooter } from './TableFooter';

const DefaultTableProps: Required<
  Omit<
    JengaTableExtendedProps,
    'customFooter' | 'customHeaderRow' | 'alternateBody' | 'onEmpty'
  >
> = {
  showFooter: true,
  customHeaderRowPostion: 'top',
  selectionMode: 'none',
  selectionBehavior: 'toggle',
  stickyHeader: false,
  zebraStripes: false,
  checkboxProps: {},
  checkboxStyles: {},
  wrapperProps: {},
  wrapperStyles: {},
  headerStyles: {},
  tableBodyStyles: {},
  tableBodyProps: {},
  footerStyles: {},
  footerProps: {},
  headerProps: {},
  cellPadding: 'regular',
  showAlternateBody: false,
  cellProps: {},
  cellStyles: {},
  setKeyboardNavigationDisabled: false,
  rowStyles: {},
  headerRowProps: {},
  headerRowStyles: {},
  rowProps: {},
};

function withDefaultTableProps<T>(props: JengaTableProps<T>) {
  for (let key of Object.keys(DefaultTableProps)) {
    if (!props.hasOwnProperty(key)) {
      props[key] = DefaultTableProps[key];
    }
  }
  return props;
}

function _Table<T extends object>(props: JengaTableProps<T>, ref) {
  props = withDefaultTableProps(useProviderProps(props));
  let {
    showFooter = true,
    alternateBody,
    showAlternateBody,
    headerProps,
    headerStyles,
    wrapperProps,
    wrapperStyles,
    footerProps,
    footerStyles,
    customHeaderRowPostion,
    tableBodyProps,
    tableBodyStyles,
    customHeaderRow,
    customFooter,
    onEmpty,
    headerRowProps,
    headerRowStyles,
    stickyHeader,
    ...otherProps
  } = props;

  let state = useTableState({
    ...props,
    showSelectionCheckboxes:
      props.selectionMode === 'multiple' &&
      props.selectionBehavior !== 'replace',
  });
  ref = useCombinedRefs([ref, useRef(null)]);
  let { gridProps } = useTable<T>(props, state, ref);
  const { styles: wrapperStylesFromProps, ...wrapperOtherProps } =
    wrapperProps || { styles: {} };
  const { styles: headerStylesFromProps, ...headerOtherProps } =
    headerProps || { styles: {} };
  const { styles: tableBodyStylesFromProps, ...tableBodyOtherProps } =
    tableBodyProps || { styles: {} };
  const { styles: footerStylesFromProps, ...footerOtherProps } =
    footerProps || { styles: {} };
  return (
    <TableWrapper
      {...wrapperOtherProps}
      styles={{ ...wrapperStylesFromProps, ...wrapperStyles }}
    >
      <TableBase<T> ref={ref} {...gridProps} {...otherProps}>
        <TableHeadSection<T>
          customHeaderPosition={customHeaderRowPostion || 'top'}
          state={state}
          headerRowProps={{
            ...headerRowProps,
            styles: {
              ...(headerRowProps?.styles || {}),
              ...headerRowStyles,
            },
          }}
          stickyHeader={stickyHeader}
          {...headerOtherProps}
          styles={{ ...headerStylesFromProps, ...headerStyles }}
        >
          {customHeaderRow}
        </TableHeadSection>
        <TableBodySection<T>
          state={state}
          alternateBody={alternateBody}
          showAlternateBody={showAlternateBody}
          onEmpty={onEmpty}
          {...tableBodyOtherProps}
          styles={{ ...tableBodyStylesFromProps, ...tableBodyStyles }}
        />
        {showFooter ? (
          customFooter ? (
            customFooter
          ) : (
            <TableFooter
              styles={{ ...footerStylesFromProps, ...footerStyles }}
              {...footerOtherProps}
              totalRecords={[...state.collection.body.childNodes].length}
            />
          )
        ) : (
          <></>
        )}
      </TableBase>
    </TableWrapper>
  );
}

const Table = forwardRef(_Table) as <T>(
  props: JengaTableProps<T>,
  ref,
) => ReactElement;
export { Table };
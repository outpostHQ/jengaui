import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import { Button } from '@jenga-ui/core';
import { Flex } from '@jenga-ui/layout';
import { Th, Tr } from './TableElementsBase';

export const TablePaginationHeader = (props) => {
  const {
    currentPage = 1,
    pages = 1,
    setPage = () => {},
    styles,
    ...otherProps
  } = props;
  return (
    <Tr styles={{ height: '52px', fill: '#f9f9fe', ...styles }} {...otherProps}>
      <Th colSpan={'100%'}>
        <Flex
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="center"
        >
          <Button
            type={'clear'}
            styles={{ width: '15px', height: '15px', margin: '0 7px' }}
            icon={
              <LeftCircleOutlined
                style={{ fontSize: '15px', color: '#2B2962' }}
              />
            }
            label="show previous results"
            padding={'0'}
            onPress={() => {
              console.log('page->', currentPage);
              if (currentPage !== 1) setPage(currentPage - 1);
            }}
          />
          {pages
            ? [...Array(pages)].map((page, index) => (
                <Button
                  type={'clear'}
                  key={`btn-pg-${index}`}
                  styles={{
                    padding: '0',
                    margin: '0 3px',
                    width: '6px',
                    aspectRatio: 1,
                    borderRadius: '50%',
                    fill: index + 1 === currentPage ? '#2B2962' : '#BCBCBC',
                    border: '1px solid black',
                  }}
                  onPress={() => {
                    console.log('page->', currentPage);
                    setPage(index + 1);
                  }}
                />
              ))
            : null}
          <Button
            type={'clear'}
            styles={{ width: '15px', height: '15px', margin: '0 5px' }}
            icon={
              <RightCircleOutlined
                style={{ fontSize: '15px', color: '#2B2962' }}
              />
            }
            label="show next results"
            onPress={() => {
              console.log('page->', currentPage);
              if (currentPage !== pages) setPage(currentPage + 1);
            }}
          />
        </Flex>
      </Th>
    </Tr>
  );
};

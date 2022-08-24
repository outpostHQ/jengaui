import { Breadcrumbs, JengaBreadCrumbProps } from '../src/BreadCrumbs';
import {
  BreadcrumbItem,
  JengaBreadCrumbItemProps,
} from '../src/BreadCrumbItem';
export default {
  title: 'Navigation/BreadCrumbs',
  component: Breadcrumbs,
};

const Template = (args: JengaBreadCrumbProps) => (
  <Breadcrumbs {...args}>
    <BreadcrumbItem elementType="a" key={'a'} href={'https://google.com'}>
      a
    </BreadcrumbItem>
    <BreadcrumbItem elementType="a" key={'b'}>
      b
    </BreadcrumbItem>
  </Breadcrumbs>
);

export const Default = Template.bind({});
Default.args = {};

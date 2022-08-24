import { Breadcrumbs, JengaBreadCrumbProps } from '../src/BreadCrumbs';
import {
  BreadcrumbItem,
  JengaBreadCrumbItemProps,
} from '../src/BreadCrumbItem';
export default {
  title: 'Navigation/BreadCrumbs',
  component: Breadcrumbs,
};

const Separator = (
  <span aria-hidden="true" style={{ padding: '0' }}>
    {'/'}
  </span>
);
const Template = (args: JengaBreadCrumbProps) => (
  <Breadcrumbs {...args} listStyles={{ fontSize: '28px' }}>
    <BreadcrumbItem
      key={'a'}
      href={'#project'}
      separator={Separator}
      styles={{ textDecoration: 'none' }}
    >
      Project
    </BreadcrumbItem>
    <BreadcrumbItem
      key={'b'}
      href={'#scope'}
      separator={Separator}
      styles={{ color: 'rgba(71, 70, 109, 1)' }}
    >
      Scope
    </BreadcrumbItem>
  </Breadcrumbs>
);

export const Default = Template.bind({});
Default.args = {};

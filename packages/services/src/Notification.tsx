import ReactDOM from 'react-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { JengaBannerProps, Banner } from '@jengaui/banner';

let ID = 0;

export interface BannerData {
  id: number;
  type?: JengaBannerProps['type'];
  message?: string;
}

export interface BannerService {
  root: Element | null;
  defaultOptions: {
    duration: number;
  };
  items: BannerData[];
  init: () => void;
  render: () => void;
  _render: (items?: BannerData[]) => void;
  show: (
    type: JengaBannerProps['type'],
    message: string,
    options?: JengaBannerOptions,
  ) => void;
  close: (number) => void;
  success: (message: string, options?: JengaBannerOptions) => void;
  info: (message: string, options?: JengaBannerOptions) => void;
  danger: (message: string, options?: JengaBannerOptions) => void;
}

export interface JengaBannerOptions {
  duration?: number;
}

/**
 * @deprecated consider using `useBannersApi` instead
 */
export const banner: BannerService = {
  root: null,
  defaultOptions: {
    duration: 5000,
  },
  items: [],
  init() {
    if (this.root) return;

    this.root = document.createElement('div');

    this.root.classList.add('jenga-banner-container');

    document.body.appendChild(this.root);

    this._render([]);
  },
  render() {
    this.init();

    this._render();
  },
  _render(items) {
    if (!items) {
      items = this.items;
    }

    ReactDOM.render(
      <TransitionGroup className="jenga-banners">
        {items.map((item) => (
          <CSSTransition key={item.id} timeout={400} classNames="jenga-banner">
            <Banner type={item.type} onClose={() => this.close(item.id)}>
              {item.message}
            </Banner>
          </CSSTransition>
        ))}
      </TransitionGroup>,
      this.root,
    );
  },
  show(type, message, options = {}) {
    options = Object.assign({}, this.defaultOptions, options);

    const id = ++ID;

    this.items.push({ id, type, message });

    this.render();

    setTimeout(() => {
      this.close(id);
    }, options.duration);
  },
  close(id) {
    this.items = this.items.filter((item) => item.id !== id);

    this.render();
  },
  success(message, options?) {
    this.show('success', message, options);
  },
  danger(message, options?) {
    this.show('danger', message, options);
  },
  info(message, options?) {
    this.show('note', message, options);
  },
};

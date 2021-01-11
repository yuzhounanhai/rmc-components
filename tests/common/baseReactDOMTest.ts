export function $$A(selector: string) {
  return document.body.querySelectorAll(selector);
};

export function $$(selector: string) {
  return document.body.querySelector(selector);
};

export interface Config {
  afterEach?: () => any;
  [key: string]: any;
};
export default function(config?: Config) {
  const {
    afterEach: afterEachFn,
  } = config || {};
  afterEach(() => {
    afterEachFn && afterEachFn();
    document.body.innerHTML = '';
  });
}
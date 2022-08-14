import Plausible from 'plausible-tracker';

let plausible: ReturnType<typeof Plausible> | null = null;
export const initPlausible = () => {
  if (!plausible) {
    plausible = Plausible({
      domain: 'th.gl-app',
      apiHost: 'https://apps.machens.dev',
    });
    plausible.enableAutoPageviews();
  }
};

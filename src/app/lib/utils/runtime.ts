const localStorageApiEndpoint =
  typeof localStorage !== 'undefined' && localStorage.getItem('apiEndpoint');

export const apiEndoint = localStorageApiEndpoint || 'https://next.th.gl' || '';

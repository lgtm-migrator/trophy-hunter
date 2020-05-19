import fetch from 'isomorphic-unfetch';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

interface JSONRequestInit extends RequestInit {
  data: unknown;
}
export const requestJSON = async <T>(
  input: RequestInfo,
  init?: JSONRequestInit
): Promise<T | string> => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...init,
  };
  if (init?.data) {
    options.body = JSON.stringify(init.data);
  }

  const fetchInput =
    typeof input === 'string' && input.startsWith('/api')
      ? `${publicRuntimeConfig.API_ENDPOINT || ''}${input}`
      : input;

  const response = await fetch(fetchInput, options);

  if (!response.ok) {
    throw response;
  }

  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    return await response.text();
  }

  return await response.json();
};

export const postJSON = async <T>(
  input: RequestInfo,
  data: unknown
): Promise<T> => {
  return (await requestJSON(input, {
    method: 'POST',
    data,
  })) as T;
};

export const getJSON = async <T>(input: RequestInfo): Promise<T> => {
  return (await requestJSON(input)) as T;
};

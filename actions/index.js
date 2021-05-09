import useSWR from 'swr';

const fetcher = (url) => {
  fetch(url).then(async (res) => {
    const result = await res.json();

    if (res.status !== 200) {
      return Promise.reject(result);
    } else {
      return result;
    }
  });
};

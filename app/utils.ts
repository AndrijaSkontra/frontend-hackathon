export const fetcher = (...args: any[]) =>
  // @ts-ignore error
  fetch(...args).then((res) => res.json());


export const getWholeUrl = (url: string) => {
  const { origin } = window.location;
  return `${origin}${url}`;
}


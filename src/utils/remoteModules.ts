export const loadScope = (url: string, scope: string) => {
  const element = document.createElement("script");
  const promise = new Promise((resolve, reject) => {
    element.src = url;
    element.type = "module";
    element.async = true;
    element.onload = () => resolve((window as never)[scope]);
    element.onerror = reject;
  });

  document.head.appendChild(element);
  return promise;
};

export const loadRemoteModule = async ({
  url,
  scope,
  module,
}: {
  url: string;
  scope: string;
  module: string;
}) => {
  try {
    const container = await loadScope(url, scope);

    // @ts-ignore
    await __webpack_init_sharing__("default");
    // @ts-ignore
    await container.init(__webpack_share_scopes__.default);

    // @ts-ignore
    const factory = await container.get(module);
    return factory();
  } catch (error) {
    throw error;
  }
};

type UnmountCallback = () => void;

const callbacks: UnmountCallback[] = [];

export const unmountAll = () => {
  callbacks.forEach((callback) => {
    callback();
  });
};

export const renderComponentWithAutoUnmount = (fn: () => UnmountCallback) => {
  callbacks.push(fn());
};

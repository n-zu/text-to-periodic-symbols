export function debounce(callback, waitTime = 400) {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(...args);
    }, waitTime);
  };
}

export function throttle(callback, interval = 400) {
  let shouldWait = false;
  let lastCallArgs;

  const nextCall = () => {
    if (lastCallArgs == null) {
      shouldWait = false;
      return;
    }
    callback(...lastCallArgs);
    lastCallArgs = null;
    setTimeout(nextCall, interval);
  };

  return (...args) => {
    if (shouldWait) {
      lastCallArgs = args;
      return;
    }

    callback(...args);
    shouldWait = true;

    setTimeout(nextCall, interval);
  };
}

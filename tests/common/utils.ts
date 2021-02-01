export function sleep(timer) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, timer);
  });
}
export const throttle = (func: Function, ms: number) => {

  let isThrottled = false,
    savedArgs: any,
    that: any;

  function wrapper(this: any) {
    if (isThrottled) {
      savedArgs = arguments;
      that = this;
      return;
    }

    func.apply(this, arguments); 

    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(that, savedArgs);
        savedArgs = that = null;
      }
    }, ms);
  }

  return wrapper;
}
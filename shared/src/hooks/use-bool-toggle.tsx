import { useState } from 'react';

export const useToggle = (defaultValue?: boolean) => {
  // to track the indexes
  const [isTrue, setIsTrue] = useState<boolean>(defaultValue ?? false);

  // define and memorize the toggler function in case we pass down the component,
  // this will move the index to the next level and reset it if it goes beyond the limit.
  const toggle = setIsTrue((previous) => !previous);

  // return value and toggle function
  return [isTrue, toggle];
};

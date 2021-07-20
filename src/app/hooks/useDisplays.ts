import { useEffect, useState } from 'react';
import { getDisplays } from '../lib/overwolf';

const useDisplays = () => {
  const [displays, setDisplays] = useState([]);

  useEffect(() => {
    getDisplays().then(setDisplays);
  }, []);

  return displays;
};

export default useDisplays;

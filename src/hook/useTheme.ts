import { useState, useEffect } from 'react';


const useTheme = (): [string, (event: any) => void] => {
  const [theme, setTheme] = useState('dark');

  const setMode = (mode: string) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  }

  const switchTheme = (event: any) => {
    if (theme === 'dark') {
      setMode('light');
    }
    else {
      setMode('dark');
    }
  }

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches && !localTheme
      ? setMode('dark')
      : localTheme
        ? setTheme(localTheme)
        : setMode('light');
  }, []);

  return [theme, switchTheme];
}
export default useTheme;
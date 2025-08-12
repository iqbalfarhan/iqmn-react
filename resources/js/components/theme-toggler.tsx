import { useAppearance } from '@/hooks/use-appearance';
import { Monitor, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';

const ThemeToggler = () => {
  const { appearance, updateAppearance } = useAppearance();

  if (appearance === 'system') {
    return (
      <Button variant="outline" size={'icon'} onClick={() => updateAppearance('light')}>
        <Monitor />
      </Button>
    );
  } else if (appearance === 'light') {
    return (
      <Button variant="outline" size={'icon'} onClick={() => updateAppearance('dark')}>
        <Sun />
      </Button>
    );
  } else if (appearance === 'dark') {
    return (
      <Button variant="outline" size={'icon'} onClick={() => updateAppearance('system')}>
        <Moon />
      </Button>
    );
  }
};

export default ThemeToggler;

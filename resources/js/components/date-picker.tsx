import dayjs from 'dayjs';
import { CalendarIcon } from 'lucide-react';
import { FC, useState } from 'react';
import InputIcon from './input-icon';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

type Props = {
  value?: Date | undefined;
  onValueChange?: (date: Date | undefined) => void;
};

const DatePicker: FC<Props> = ({ value, onValueChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <InputIcon
          icon={CalendarIcon}
          value={value ? dayjs(value).format('DD MMMM YYYY') : 'Pilih tanggal'}
          className="text-start"
          placeholder="Pilih tanggal"
        />
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          captionLayout="dropdown"
          onSelect={(date: Date | undefined) => {
            onValueChange?.(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Control, FieldValues, Path } from 'react-hook-form';

type BasicSelectFormProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  formControl: Control<T, any>;
  placeholder: string;
  selectValues: string[];
};

const BasicSelectForm = <T extends FieldValues>({
  formControl,
  name,
  label,
  placeholder,
  selectValues,
}: BasicSelectFormProps<T>) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {selectValues.map(item => (
                <SelectItem
                  key={item}
                  className="cursor-pointer"
                  value={item.toLowerCase()}
                >
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BasicSelectForm;

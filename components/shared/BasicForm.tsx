import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control, FieldValues, Path } from 'react-hook-form';

type BasicFormProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  formControl: Control<T, any>;
};

const BasicForm = <T extends FieldValues>({
  formControl,
  name,
  label,
}: BasicFormProps<T>) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BasicForm;

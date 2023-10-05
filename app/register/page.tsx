'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useState } from 'react';
import register from '@/firebase/auth/register';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const formSchema = z.object({
  email: z.string().email({
    message: 'Geçerli bir e-posta adresi giriniz.',
  }),
  password: z.string().min(6, {
    message: 'Şifre en az 6 karakter olmalıdır.',
  }),
  name: z.string().min(1, {
    message: 'Lütfen geçerli bir ad giriniz.',
  }),
  surname: z.string().min(1, {
    message: 'Lütfen geçerli bir soyad giriniz.',
  }),
  birthdate: z
    .date()
    .nullable()
    .refine(
      date => {
        if (date === null) return true;
        const year = date.getFullYear();
        return year > 1900 && year < 2023;
      },
      {
        message: 'Lütfen geçerli bir doğum tarihi giriniz. (1900-2022).',
      }
    ),
  gender: z.string({
    required_error: 'Lütfen bir cinsiyet seçin.',
  }),
});

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      surname: '',
      gender: undefined,
      birthdate: new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { result, error } = await register(values.email, values.password);
    if (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          toast({
            variant: 'destructive',
            description: 'Bu e-posta zaten kayıtlı.',
          });
          break;

        default:
          toast({
            variant: 'destructive',
            description: 'Bir hata oluştu. Lütfen tekrar deneyin.',
          });

          break;
      }
      console.log(error.code);
    } else {
      router.push('/login');
    }
  }

  return (
    <section className="flex justify-center items-center h-auto my-10 lg:h-screen lg:my-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-11/12 max-w-2xl space-y-8 border-4 border-slate-400 p-8 rounded-sm"
        >
          <h2 className="text-2xl text-center border-b-2 border-red-400">
            KAYIT OL
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-posta</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Şifre</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        {...field}
                      />
                      <button
                        type="button"
                        aria-label={
                          showPassword ? 'Hide password' : 'Show password'
                        }
                        role="button"
                        aria-pressed={showPassword}
                        onClick={() => setShowPassword(prevState => !prevState)}
                        className="absolute bottom-[0.35rem] right-5 cursor-pointer"
                      >
                        {showPassword ? (
                          <AiFillEye className="w-6 h-6" />
                        ) : (
                          <AiFillEyeInvisible className="w-6 h-6" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ad</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Soyad</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cinsiyet</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Lütfen cinsiyetinizi seçin" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem className="cursor-pointer" value="erkek">
                        Erkek
                      </SelectItem>
                      <SelectItem className="cursor-pointer" value="kadın">
                        Kadın
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthdate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block md:mb-3">Doğum Tarihi</FormLabel>
                  <FormControl>
                    <DatePicker
                      selected={field.value}
                      onChange={date => field.onChange(date)}
                      dateFormat="dd/MM/yyyy"
                      wrapperClassName="w-full"
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full">
            Kayıt ol
          </Button>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-2 border-red-200 p-2 rounded-lg">
            <p className="underline">Zaten hesabınız var mı? </p>
            <Button className="h-8 bg-slate-900 hover:bg-slate-900/90">
              <Link href="/login">Giriş yap</Link>
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};
export default RegisterPage;

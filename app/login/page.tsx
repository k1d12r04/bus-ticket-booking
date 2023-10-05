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
import login from '@/firebase/auth/login';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  email: z.string().email({
    message: 'Geçerli bir e-posta adresi giriniz.',
  }),
  password: z.string().min(6, {
    message: 'Şifre en az 6 karakter olmalıdır.',
  }),
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { result, error } = await login(values.email, values.password);
    if (error) {
      return console.log(error);
    }
    console.log(result);
    return router.push('/');
  }

  return (
    <section className="flex justify-center items-center h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-11/12 max-w-sm space-y-8 border-4 border-slate-400 p-8 rounded-sm"
        >
          <h2 className="text-2xl text-center border-b-2 border-red-400">
            GİRİŞ YAP
          </h2>
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
              <FormItem className="relative">
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

          <Button type="submit" className="w-full">
            Giriş yap
          </Button>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-2 border-red-200 p-2 rounded-lg">
            <p className="underline">Hesabınız yok mu?</p>
            <Button className="h-8">
              <Link href="/register">Kayıt ol</Link>
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};
export default LoginPage;

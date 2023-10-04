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

const formSchema = z.object({
  email: z.string(),
  password: z.string().min(3, {
    message: 'Şifre en az 3 karakter olmalıdır.',
  }),
});

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <section className="flex justify-center items-center h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-11/12 max-w-sm space-y-8 border-4 border-slate-400 p-8 rounded-sm"
        >
          <h2 className="text-2xl text-center border-b-2 border-red-400">
            KAYIT OL
          </h2>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-posta</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
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
                    {showPassword ? (
                      <AiFillEye
                        onClick={() => setShowPassword(prevState => !prevState)}
                        className="w-6 h-6 absolute bottom-[0.35rem] right-5 cursor-pointer"
                      />
                    ) : (
                      <AiFillEyeInvisible
                        onClick={() => setShowPassword(prevState => !prevState)}
                        className="w-6 h-6 absolute bottom-[0.35rem]  right-5 cursor-pointer"
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-2 border-red-200 p-2 rounded-lg">
            <p className="underline">Zaten hesabınız var mı? </p>
            <Button className="h-8">
              <Link href="/login">Giriş yap</Link>
            </Button>
          </div>
          <Button type="submit">Kayıt ol</Button>
        </form>
      </Form>
    </section>
  );
};
export default RegisterPage;

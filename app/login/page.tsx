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
import { useToast } from '@/components/ui/use-toast';
import busImage from '@/public/images/bus.webp';
import Image from 'next/image';
import { AuthError } from 'firebase/auth';
import { Spinner } from '@nextui-org/react';

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
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await login(values.email, values.password);
      setIsLoading(false);
      router.push('/');
    } catch (error) {
      if (
        error &&
        (error as AuthError).code === 'auth/invalid-login-credentials'
      ) {
        toast({
          variant: 'destructive',
          description: 'E-posta ve/veya şifre yanlış.',
        });
      } else if (error && (error as AuthError).code === 'auth/invalid-email') {
        toast({
          variant: 'destructive',
          description: 'Geçersiz e-posta adresi.',
        });
      } else {
        toast({
          variant: 'destructive',
          description:
            'Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-5 content-center md:h-screen">
      <Image
        src={busImage}
        alt="bus image"
        className="object-cover h-screen hidden md:block lg:col-span-3"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 p-8 flex flex-col justify-center lg:col-span-2"
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
            {isLoading ? <Spinner size="sm" color="success" /> : 'Giriş yap'}
          </Button>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-2 border-red-200 p-2 rounded-lg">
            <p className="underline">Hesabınız yok mu?</p>
            <Button className="h-8 bg-slate-900 hover:bg-slate-900/90">
              <Link href="/register">Kayıt ol</Link>
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};
export default LoginPage;

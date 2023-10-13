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
import { useState } from 'react';
import { Spinner } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useDisclosure } from '@nextui-org/react';

import ModalComponent from '@/components/shared/ModalComponent';
import BasicForm from '@/components/shared/BasicForm';

const formSchema = z.object({
  name: z
    .string({
      required_error: 'Lütfen bir isim giriniz.',
    })
    .min(4, {
      message: 'Lütfen geçerli bir isim giriniz.',
    }),
  cardNumber: z
    .string({
      required_error: 'Lütfen kart numaranızı giriniz.',
    })
    .refine(
      value => {
        const numericValue = value.replace(/\s/g, '');
        const regex = /^\d{13,19}$/;
        return regex.test(numericValue);
      },
      {
        message: 'Lütfen geçerli bir kart numarası giriniz.',
      }
    ),
  expiryDate: z
    .string({
      required_error: 'Bu alan boş bırakılamaz.',
    })
    .refine(
      value => {
        const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        return regex.test(value);
      },
      {
        message:
          'Geçersiz son kullanma tarihi. Lütfen şu formatı kullanın "AA/YY".',
      }
    ),

  cvc: z
    .string({
      required_error: 'Bu alan boş bırakılamaz.',
    })
    .min(3, {
      message: 'CVC en az 3 rakam içermelidir.',
    }),
});

const PaymentPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: undefined,
      cardNumber: undefined,
      cvc: undefined,
    },
  });

  function formatCardNumber(value: string) {
    const numericValue = value.replace(/\D/g, '');
    const formattedValue = numericValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formattedValue;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    onOpen();
  }

  return (
    <section className="flex justify-center items-center h-auto my-10 lg:h-screen lg:my-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative w-11/12 max-w-2xl space-y-8 border-4 border-slate-400 p-8 rounded-sm"
        >
          <h2 className="text-2xl text-center border-b-2 border-red-400">
            ÖDEME
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BasicForm
              name="name"
              label="Kartın üstündeki isim"
              formControl={form.control}
            />

            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kart numarası</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={e => {
                        const formattedValue = formatCardNumber(e.target.value);
                        field.onChange(formattedValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <BasicForm
              name="expiryDate"
              label="Son kullanma tarihi"
              formControl={form.control}
            />

            <BasicForm
              name="cvc"
              label="CVC2 (kartın arkasındaki son 3 rakam)"
              formControl={form.control}
            />
          </div>

          <Button disabled={isSubmitting} className="w-full">
            {' '}
            {isSubmitting ? (
              <Spinner color="success" size="sm" />
            ) : (
              'Ödemeyi yap'
            )}{' '}
          </Button>

          <ModalComponent
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            header="Ödeme Durumu"
            body={<p>Ödemeniz başarıyla gerçekleşti.</p>}
            footerPrimaryActionButtonText="Anasayfaya dön"
            primaryActionHandler={() => router.push('/')}
          />
        </form>
      </Form>
    </section>
  );
};
export default PaymentPage;

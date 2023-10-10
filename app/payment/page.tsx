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
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button as NextButton,
} from '@nextui-org/react';

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
    console.log(values);
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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kartın üstündeki isim</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Son kullanma tarihi</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cvc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVC2 (kartın arkasındaki son 3 rakam)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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

          <Modal
            hideCloseButton={true}
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          >
            <ModalContent>
              {onClose => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Ödeme Durumu
                  </ModalHeader>
                  <ModalBody>
                    <p>Ödemeniz başarıyla gerçekleşti.</p>
                  </ModalBody>
                  <ModalFooter>
                    <NextButton
                      onClick={() => router.push('/')}
                      color="primary"
                      onPress={onClose}
                    >
                      Anasayfaya dön
                    </NextButton>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </form>
      </Form>
    </section>
  );
};
export default PaymentPage;

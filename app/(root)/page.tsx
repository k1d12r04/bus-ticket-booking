'use client';

import { useEffect, useState } from 'react';
import Container from '@/components/shared/Container';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import busRoutes from '@/busRoutes.json';

import { HiArrowLongRight } from 'react-icons/hi2';
import { BsFillCalendar2EventFill } from 'react-icons/bs';
import { MdOutlineAirlineSeatReclineExtra } from 'react-icons/md';
import { FaTurkishLiraSign } from 'react-icons/fa6';
import { useAuthContext } from '@/context/AuthContext';
import { redirect, useRouter } from 'next/navigation';
import BasicSelectForm from '@/components/shared/BasicSelectForm';

type filteredRoutesTypes = {
  id: number;
  departureCity: string;
  arrivalCity: string;
  date: string;
  availableSeats: number;
  price: number;
};

const formSchema = z.object({
  departure: z.string().min(1, {
    message: 'Lütfen kalkış şehrini seçin.',
  }),
  arrival: z.string().min(1, {
    message: 'Lütfen gidilecek şehri seçin.',
  }),
  selectedDate: z
    .date({
      invalid_type_error: 'Lütfen bir tarih seçin.',
    })
    .refine(
      date => {
        if (date === null) return true;
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);
        return date >= currentDate;
      },
      {
        message: 'Lütfen geçerli bir tarih giriniz.',
      }
    ),
});

export default function HomePage() {
  const authContext = useAuthContext();
  const user = authContext?.user;

  useEffect(() => {
    if (user == null) {
      redirect('/register');
    }
  }, [user]);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      departure: '',
      arrival: '',
      selectedDate: new Date(),
    },
  });

  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const [filteredRoutes, setFilteredRoutes] = useState<filteredRoutesTypes[]>(
    []
  );
  const routes = busRoutes.routes;

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsFirstLoad(false);
    const { departure, arrival, selectedDate } = values;

    const filteredRoutesArr = routes.filter(route => {
      const [day, month, year] = route.date.split('/');
      const routeDate = new Date(`${year}-${month}-${day}`);
      routeDate.setHours(0, 0, 0, 0);

      return (
        route.departureCity.toLowerCase() === departure.toLowerCase() &&
        route.arrivalCity.toLowerCase() === arrival.toLowerCase() &&
        routeDate >= selectedDate
      );
    });

    const descendingOrderedFilteredRoutes = [...filteredRoutesArr].sort(
      (a, b) => {
        const dateA = new Date(a.date.split('/').reverse().join('/'));
        const dateB = new Date(b.date.split('/').reverse().join('/'));

        return dateA.getTime() - dateB.getTime();
      }
    );

    setFilteredRoutes(descendingOrderedFilteredRoutes);
  }

  return (
    <main>
      <Container>
        <h2 className="text-center text-2xl">Bibilet</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-5 mt-10 grid gap-x-4 gap-y-4 xs:grid-cols-3 md:gap-x-10">
              <BasicSelectForm
                name="departure"
                label="Kalkış Yeri"
                placeholder="Lütfen bir şehir seçin."
                formControl={form.control}
                selectValues={['Bursa', 'Ankara']}
              />

              <BasicSelectForm
                name="arrival"
                label="Varış yeri"
                placeholder="Lütfen bir şehir seçin."
                formControl={form.control}
                selectValues={['Van', 'Artvin']}
              />

              <FormField
                control={form.control}
                name="selectedDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="here">Tarih</FormLabel>
                    <FormControl>
                      <ReactDatePicker
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

            <Button
              type="submit"
              className="px-8 w-full block md:w-48 md:py-2 md:h-auto md:mx-auto md:text-base"
            >
              Ara
            </Button>
          </form>
        </Form>

        {filteredRoutes && filteredRoutes.length > 0 ? (
          <ul className="mt-8 p-4 shadow-2xl rounded-sm space-y-6">
            {filteredRoutes.map(route => (
              <li
                key={route.id}
                className="text-sm md:text-base border-2 border-red-200 rounded-lg p-2 md:p-6 cursor-pointer hover:bg-red-200 transition"
                onClick={() => router.push(`/${route.id}`)}
              >
                <div className="flex justify-between md:justify-evenly items-center mb-6 bg-slate-800 text-red-50 p-4 rounded-lg">
                  <p> Kalkış: {route.departureCity} </p>
                  <HiArrowLongRight className="w-8 h-8 hidden sm:block" />
                  <p>Varış: {route.arrivalCity}</p>
                </div>
                <div className="space-y-3 bg-gray-800 p-4 text-red-50 rounded-md md:flex md:items-center md:justify-evenly md:space-y-0">
                  <div className="flex justify-between md:justify-center md:gap-4 items-center">
                    <p className="">Tarih: {route.date} </p>
                    <BsFillCalendar2EventFill className="w-5 h-5" />
                  </div>
                  <div className="flex justify-between items-center md:justify-center md:gap-4">
                    <p className="">Boş koltuk: {route.availableSeats} </p>
                    <MdOutlineAirlineSeatReclineExtra className="w-5 h-5" />
                  </div>
                  <div className="flex justify-between items-center md:justify-center md:gap-4">
                    <p className="">Fiyat: {route.price} </p>
                    <FaTurkishLiraSign className="w-4 h-4" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 text-center">
            {isFirstLoad ? null : 'Seçilen kriterlere uygun sefer bulunamadı.'}
          </div>
        )}
      </Container>
    </main>
  );
}

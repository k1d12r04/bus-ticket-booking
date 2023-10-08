'use client';

import Container from '@/components/Container';
import { HiArrowLongRight } from 'react-icons/hi2';
import { BsFillCalendar2EventFill } from 'react-icons/bs';
import { MdOutlineAirlineSeatReclineExtra } from 'react-icons/md';
import { FaTurkishLiraSign } from 'react-icons/fa6';
import busRoutes from '@/busRoutes.json';

const SeatSelectionPage = ({ params }: { params: { id: string } }) => {
  const routeId = Number(params.id);
  const routes = busRoutes.routes;
  const selectedRoute = routes.find(route => route.id === routeId);

  return (
    <section>
      <Container>
        <div className="flex justify-evenly items-center mb-6 bg-slate-800 text-red-50 p-4 rounded-lg">
          <p> Kalkış: {selectedRoute?.departureCity} </p>
          <HiArrowLongRight className="w-8 h-8" />
          <p>Varış: {selectedRoute?.arrivalCity}</p>
        </div>
        <div className="flex justify-between bg-gray-800 p-4 text-red-50 rounded-md">
          <p className="inline-flex items-center gap-2">
            Tarih: {selectedRoute?.date}{' '}
            <span>
              <BsFillCalendar2EventFill className="w-5 h-5" />
            </span>{' '}
          </p>
          <p className="inline-flex items-center gap-2">
            Boş koltuk: {selectedRoute?.availableSeats}{' '}
            <span>
              <MdOutlineAirlineSeatReclineExtra className="w-5 h-5" />
            </span>{' '}
          </p>
          <p className="inline-flex items-center gap-2">
            Fiyat:
            {selectedRoute?.price}{' '}
            <span>
              <FaTurkishLiraSign className="w-4 h-4" />
            </span>
          </p>
        </div>
      </Container>
    </section>
  );
};
export default SeatSelectionPage;

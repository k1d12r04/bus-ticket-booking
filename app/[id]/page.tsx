'use client';

import Container from '@/components/Container';
import { HiArrowLongRight } from 'react-icons/hi2';
import { BsFillCalendar2EventFill } from 'react-icons/bs';
import { MdOutlineAirlineSeatReclineExtra } from 'react-icons/md';
import { FaTurkishLiraSign } from 'react-icons/fa6';
import busRoutes from '@/busRoutes.json';
import Bus from '@/components/Bus';

const SeatSelectionPage = ({ params }: { params: { id: string } }) => {
  const routeId = Number(params.id);
  const routes = busRoutes.routes;
  const selectedRoute = routes.find(route => route.id === routeId);

  return (
    <section>
      <Container>
        <div className="flex justify-between md:justify-evenly items-center mb-6 bg-slate-800 text-red-50 p-4 rounded-lg">
          <p> Kalkış: {selectedRoute?.departureCity} </p>
          <HiArrowLongRight className="w-8 h-8 hidden sm:block" />
          <p>Varış: {selectedRoute?.arrivalCity}</p>
        </div>
        <div className="space-y-3 bg-gray-800 p-4 text-red-50 rounded-md md:flex md:items-center md:justify-evenly md:space-y-0">
          <div className="flex justify-between md:justify-center md:gap-4 items-center">
            <p className="">Tarih: {selectedRoute?.date} </p>
            <BsFillCalendar2EventFill className="w-5 h-5" />
          </div>
          <div className="flex justify-between items-center md:justify-center md:gap-4">
            <p className="">Boş koltuk: {selectedRoute?.availableSeats} </p>
            <MdOutlineAirlineSeatReclineExtra className="w-5 h-5" />
          </div>
          <div className="flex justify-between items-center md:justify-center md:gap-4">
            <p className="">Fiyat: {selectedRoute?.price} </p>
            <FaTurkishLiraSign className="w-4 h-4" />
          </div>
        </div>

        <Bus totalSeats={20} price={selectedRoute?.price} />
      </Container>
    </section>
  );
};

export default SeatSelectionPage;

'use client';

import { useState } from 'react';
import Seat from './Seat';
import { useToast } from '@/components/ui/use-toast';
import { FaTurkishLiraSign } from 'react-icons/fa6';

interface BusProps {
  totalSeats: number;
  price: number | undefined;
}

const Bus: React.FC<BusProps> = ({ totalSeats, price }) => {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const { toast } = useToast();

  const [isSelectable, setIsSelectable] = useState(true);

  const handleSeatSelect = (seatNumber: number) => {
    if (selectedSeats.length >= 5 && !selectedSeats.includes(seatNumber)) {
      setIsSelectable(false);
      toast({
        variant: 'destructive',
        title: "5'ten fazla koltuk seçilemez!",
      });
    } else if (!selectedSeats.includes(seatNumber)) {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleCancel = (seatNumber: number) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
    }
  };

  const seatNumbers = [];
  for (let i = 0; i < totalSeats; i += 2) {
    seatNumbers.push(i + 1, i + 2);
  }

  const formattedSumPrice =
    price && (price * selectedSeats.length).toLocaleString('tr-TR');

  return (
    <div className="my-10">
      <h2 className="mb-6 border-b-2 border-red-300">
        Koltuk seçiminizi yapın
      </h2>
      <div className="grid grid-cols-10 gap-y-5 gap-x-4">
        {seatNumbers.map(seatNumber => (
          <Seat
            key={seatNumber}
            seatNumber={seatNumber}
            isSelected={selectedSeats.includes(seatNumber)}
            onSelect={handleSeatSelect}
            selectedSeatNumber={selectedSeats.length}
            onCancel={handleCancel}
            isSelectable={isSelectable}
          />
        ))}
      </div>
      <div className="flex gap-1 mt-10 items-center">
        <p>
          Toplam fiyat:{' '}
          <span className="font-semibold">{formattedSumPrice}</span>
        </p>
        <FaTurkishLiraSign className="w-4 h-4" />
      </div>
    </div>
  );
};

export default Bus;

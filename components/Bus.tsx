'use client';

import { useState } from 'react';
import Seat from './Seat';
import { useToast } from '@/components/ui/use-toast';

interface BusProps {
  totalSeats: number;
}

const Bus: React.FC<BusProps> = ({ totalSeats }) => {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const { toast } = useToast();

  const handleSeatSelect = (seatNumber: number) => {
    if (selectedSeats.length >= 5 && !selectedSeats.includes(seatNumber)) {
      toast({
        variant: 'destructive',
        title: "5'ten fazla koltuk seçilemez!",
      });
      if (selectedSeats.includes(seatNumber)) {
        setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
      }
    } else if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const seatNumbers = [];
  for (let i = 0; i < totalSeats; i += 2) {
    seatNumbers.push(i + 1, i + 2);
  }

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
          />
        ))}
      </div>
      <p className="mt-5">Seçilen koltuklar: {selectedSeats.join(', ')}</p>
    </div>
  );
};

export default Bus;

'use client';

import Image from 'next/image';
import seatImage from '@/public/images/seat.png';
import { useAuthContext } from '@/context/AuthContext';
import getData from '@/firebase/firestore/getData';
import { useState, useEffect } from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from './ui/button';

type SeatProps = {
  seatNumber: number;
  isSelected: boolean;
  selectedSeatNumber: number;
  onSelect: (seatNumber: number) => void;
  onCancel: (seatNumber: number) => void;
  isSelectable: boolean;
};

type UserDataType = {
  email: string;
  id: string;
  gender: string;
  name: string;
  password: string;
  surname: string;
  birthDate: Date;
};

const Seat: React.FC<SeatProps> = ({
  seatNumber,
  isSelected,
  isSelectable,
  selectedSeatNumber,
  onSelect,
  onCancel,
}) => {
  const authContext = useAuthContext();
  const UserId = authContext?.user?.uid;
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  useEffect(() => {
    const getDataFromDb = async () => {
      if (UserId) {
        const { data, error } = await getData('users', UserId);
        if (error) {
          console.log(error);
        } else {
          setUserData(data);
        }
      }
    };

    getDataFromDb();
  }, [UserId]);

  const handleClosePopover = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    onCancel(seatNumber);
  };

  const handleSeatSelect = () => {
    onSelect(seatNumber);
  };

  return (
    <Popover open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <PopoverTrigger>
        <div
          className={`cursor-pointer bg-red-50 transition p-2 rounded-sm 
          
          ${isSelected && selectedGender === 'erkek' && 'bg-sky-500'}
          ${isSelected && selectedGender === 'kadın' && 'bg-pink-500'}
          `}
        >
          <div>{seatNumber}</div>
          <Image src={seatImage} alt="seat image" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="flex justify-between p-2">
        <Button
          onClick={() => {
            handleClosePopover();
            setSelectedGender('kadın');
            handleSeatSelect();
          }}
        >
          Kadın
        </Button>
        <Button
          onClick={() => {
            handleClosePopover();
            setSelectedGender('erkek');
            handleSeatSelect();
          }}
        >
          Erkek
        </Button>
        <Button
          onClick={() => {
            handleClosePopover();
            handleCancel();
          }}
          variant={'outline'}
        >
          İptal et
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default Seat;

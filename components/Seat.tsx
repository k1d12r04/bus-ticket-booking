import Image from 'next/image';
import seatImage from '@/public/images/seat.png';
import { useAuthContext } from '@/context/AuthContext';
import getData from '@/firebase/firestore/getData';

interface SeatProps {
  seatNumber: number;
  isSelected: boolean;
  onSelect: (seatNumber: number) => void;
}

const Seat: React.FC<SeatProps> = ({ seatNumber, isSelected, onSelect }) => {
  const authContext = useAuthContext();
  const UserId = authContext?.user?.uid;

  const handleClick = () => {
    onSelect(seatNumber);
  };

  return (
    <div
      className={`cursor-pointer  transition p-2 rounded-sm ${
        isSelected ? 'bg-green-300' : 'bg-red-50 hover:bg-green-300'
      }`}
      onClick={handleClick}
    >
      <div>{seatNumber}</div>
      <Image src={seatImage} alt="seat image" />
    </div>
  );
};

export default Seat;

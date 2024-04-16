import { IExendedMember } from "../interfaces";

export const MAX_RENTALS = 4;

type Props = {
  member: IExendedMember;
};

export const isMemberRentalsReachedToLimit = ({ member }: Props) => {
  let rentalCount = 0;

  member.rentals.forEach((rental) => {
    if (rental.returned_at === null) {
      rentalCount++;
    }
  });

  return rentalCount >= MAX_RENTALS;
};

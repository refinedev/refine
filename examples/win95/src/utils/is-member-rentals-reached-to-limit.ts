import { IExendedMember } from "../interfaces";
import { MAXIMUM_TAPE_ALLOWED_TO_RENT } from "./app-settings";

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

  return rentalCount >= MAXIMUM_TAPE_ALLOWED_TO_RENT;
};

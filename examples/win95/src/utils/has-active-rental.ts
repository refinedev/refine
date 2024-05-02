import { IExendedMember } from "../interfaces";

type Props = {
  member: IExendedMember;
};

export const hasActiveRental = ({ member }: Props) => {
  const hasUnreturnedTape = member.rentals.some(
    (rental) => !rental.returned_at,
  );

  return hasUnreturnedTape;
};

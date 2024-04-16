import { IExendedMember } from "../interfaces";

type Props = {
  member: IExendedMember;
};

export const hasMemberUnreturnedTape = ({ member }: Props) => {
  const hasUnreturnedTape = member.rentals.some(
    (rental) => !rental.returned_at,
  );

  return hasUnreturnedTape;
};

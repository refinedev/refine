import cn from "clsx";
import rangeMap from "@lib/range-map";

import { Star } from "@components/icons";

export interface RatingProps {
    value: number;
}

export const Rating: React.FC<RatingProps> = ({ value = 5 }) => (
    <div className="text-accent-9 flex flex-row py-6">
        {rangeMap(5, (i) => (
            <span
                key={`star_${i}`}
                className={cn("ml-1 inline-block ", {
                    "text-accent-5": i >= Math.floor(value),
                })}
            >
                <Star />
            </span>
        ))}
    </div>
);

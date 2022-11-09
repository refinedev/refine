import { arrayGuess } from "./array";
import { booleanGuess } from "./boolean";
import { dateGuess } from "./date";
import { emailGuess } from "./email";
import { imageGuess } from "./image";
import { nullishGuess } from "./nullish";
import { numberGuess } from "./number";
import { objectGuess } from "./object";
import { relationGuess } from "./relation";
import { richtextGuess } from "./richtext";
import { textGuess } from "./text";
import { urlGuess } from "./url";

export const defaultElements = [
    arrayGuess,
    booleanGuess,
    dateGuess,
    emailGuess,
    imageGuess,
    nullishGuess,
    numberGuess,
    objectGuess,
    relationGuess,
    richtextGuess,
    textGuess,
    urlGuess,
];

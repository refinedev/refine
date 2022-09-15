// Convert numbers or strings to pixel value
// Helpful for styled-jsx when using a prop
// height: ${toPixels(height)}; (supports height={20} and height="20px")

const toPixels = (value: string | number) => {
    if (typeof value === "number") {
        return `${value}px`;
    }

    return value;
};

export default toPixels;

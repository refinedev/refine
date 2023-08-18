/*
 * generates random colors from  https://ant.design/docs/spec/colors. <color-4> used.
 */
export const getRandomColor = () => {
    const colors = [
        "#ff9c6e",
        "#ff7875",
        "#ffc069",
        "#ffd666",
        "#fadb14",
        "#95de64",
        "#5cdbd3",
        "#69c0ff",
        "#85a5ff",
        "#b37feb",
        "#ff85c0",
    ];

    return colors[Math.floor(Math.random() * colors.length)];
};

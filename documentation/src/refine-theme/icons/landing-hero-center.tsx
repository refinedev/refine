import clsx from "clsx";
import React from "react";

export const LandingHeroCenterSvg = (props: React.SVGProps<SVGSVGElement>) => (
    <>
        <svg
            width={128}
            height={128}
            viewBox="0 0 128 128"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            {...props}
            className={clsx(props.className, "hidden dark:block")}
        >
            <rect
                x={0.5}
                y={0.5}
                width={127}
                height={127}
                rx={63.5}
                fill="#303450"
                stroke="url(#paint0_linear_1254_3856)"
            />
            <g filter="url(#filter0_diiii_1254_3856)">
                <path
                    d="M64 58C67.3137 58 70 55.3137 70 52C70 48.6863 67.3137 46 64 46C60.6863 46 58 48.6863 58 52C58 55.3137 60.6863 58 64 58Z"
                    fill="url(#paint1_linear_1254_3856)"
                    className="animate-hero-logo-pulse"
                    shapeRendering="crispEdges"
                />
                <path
                    d="M64 58C67.3137 58 70 55.3137 70 52C70 48.6863 67.3137 46 64 46C60.6863 46 58 48.6863 58 52C58 55.3137 60.6863 58 64 58Z"
                    fill="url(#pattern0)"
                    fillOpacity={0.5}
                    style={{
                        mixBlendMode: "soft-light",
                    }}
                    shapeRendering="crispEdges"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M58.6334 29.2669C62.0118 27.5777 65.9882 27.5777 69.3666 29.2669L93.3666 41.2669C97.432 43.2996 100 47.4547 100 52V76C100 80.5453 97.432 84.7004 93.3666 86.7331L69.3666 98.7331C65.9882 100.422 62.0118 100.422 58.6334 98.7331L34.6334 86.7331C30.568 84.7004 28 80.5453 28 76V52C28 47.4547 30.568 43.2996 34.6334 41.2669L58.6334 29.2669ZM52 52C52 45.3726 57.3726 40 64 40C70.6274 40 76 45.3726 76 52V76C76 82.6274 70.6274 88 64 88C57.3726 88 52 82.6274 52 76V52Z"
                    fill="url(#paint2_linear_1254_3856)"
                    className="animate-hero-logo-pulse"
                    shapeRendering="crispEdges"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M58.6334 29.2669C62.0118 27.5777 65.9882 27.5777 69.3666 29.2669L93.3666 41.2669C97.432 43.2996 100 47.4547 100 52V76C100 80.5453 97.432 84.7004 93.3666 86.7331L69.3666 98.7331C65.9882 100.422 62.0118 100.422 58.6334 98.7331L34.6334 86.7331C30.568 84.7004 28 80.5453 28 76V52C28 47.4547 30.568 43.2996 34.6334 41.2669L58.6334 29.2669ZM52 52C52 45.3726 57.3726 40 64 40C70.6274 40 76 45.3726 76 52V76C76 82.6274 70.6274 88 64 88C57.3726 88 52 82.6274 52 76V52Z"
                    fill="url(#pattern1)"
                    fillOpacity={0.5}
                    style={{
                        mixBlendMode: "soft-light",
                    }}
                    shapeRendering="crispEdges"
                />
            </g>
            <defs>
                <filter
                    id="filter0_diiii_1254_3856"
                    x={12}
                    y={14}
                    width={104}
                    height={104}
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dy={2} />
                    <feGaussianBlur stdDeviation={8} />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.1 0 0 0 0 0.5 0 0 0 0 0.7 0 0 0 1 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1254_3856"
                    />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1254_3856"
                        result="shape"
                    />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dy={8} />
                    <feGaussianBlur stdDeviation={8} />
                    <feComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2={-1}
                        k3={1}
                    />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.1 0 0 0 0 0.5 0 0 0 0 0.7 0 0 0 0.75 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="shape"
                        result="effect2_innerShadow_1254_3856"
                    />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dx={-2} dy={2} />
                    <feComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2={-1}
                        k3={1}
                    />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.1 0 0 0 0 0.5 0 0 0 0 0.7 0 0 0 0.25 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="effect2_innerShadow_1254_3856"
                        result="effect3_innerShadow_1254_3856"
                    />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dy={-2} />
                    <feComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2={-1}
                        k3={1}
                    />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
                    />
                    <feBlend
                        mode="overlay"
                        in2="effect3_innerShadow_1254_3856"
                        result="effect4_innerShadow_1254_3856"
                    />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dx={2} dy={-2} />
                    <feComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2={-1}
                        k3={1}
                    />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.12 0"
                    />
                    <feBlend
                        mode="overlay"
                        in2="effect4_innerShadow_1254_3856"
                        result="effect5_innerShadow_1254_3856"
                    />
                </filter>
                <pattern
                    id="pattern0"
                    patternContentUnits="objectBoundingBox"
                    width={0.0833333}
                    height={0.0833333}
                >
                    <use
                        xlinkHref="#image0_1254_3856"
                        transform="scale(0.00130208)"
                    />
                </pattern>
                <pattern
                    id="pattern1"
                    patternContentUnits="objectBoundingBox"
                    width={0.0833333}
                    height={0.0833333}
                >
                    <use
                        xlinkHref="#image0_1254_3856"
                        transform="scale(0.00130208)"
                    />
                </pattern>
                <linearGradient
                    id="paint0_linear_1254_3856"
                    x1={64}
                    y1={0}
                    x2={64}
                    y2={128}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#474E6B" />
                    <stop offset={1} stopColor="#474E6B" stopOpacity={0} />
                </linearGradient>
                <linearGradient
                    id="paint1_linear_1254_3856"
                    x1={64}
                    y1={28}
                    x2={64}
                    y2={100}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#B5FFFF" stopOpacity={0.95} />
                    <stop offset={1} stopColor="#B5FFFF" />
                </linearGradient>
                <linearGradient
                    id="paint2_linear_1254_3856"
                    x1={64}
                    y1={28}
                    x2={64}
                    y2={100}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#B5FFFF" stopOpacity={0.95} />
                    <stop offset={1} stopColor="#B5FFFF" />
                </linearGradient>
                <image
                    id="image0_1254_3856"
                    width={64}
                    height={64}
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAQKADAAQAAAABAAAAQAAAAABGUUKwAAAB+ElEQVR4Ae2ZjVGDQBCFxQqwA6xArCCWQCl2YAmaCowdWIJUIFYAHYQO8L2Tu0zMOJoJ3HLm7cwbfiZzb/e7DRyQXfwxhmHI8dMKWkElVEA8x+ihDmqgGnrNsozn0g8UXkCP0BY6Jp7x4yJZAkg+h1j4qcExfKekwQMJc9ZbaKpoMVAa3YBES4gJTx0tBiwX3QJIcOqZ/w6REBbVCZmfESTG/+k7NHeCHTxul3KXuEQyPh6wU/iDGbf0oNciwnXA2JZt5Iyu0QVdZM8DO98BFjNyf5CNwYls/O9vDbx7eLILuDULdkBl5J4beoeSCWAVjuLvWHq7agmgjF93cLT0DgCKkE78HUtvVy0vgkP8uneOuAiGxdjubLw9fxuM57gwJwLoDXOy9HZlE0BnCMDS25VNAB+GABpD7wDgzTCJ2tDbWfulcIuj3CCZK/Ol8JjAi0HxG+viWbMehx2Fr+fydcQuWGP2u4h+P1qFVdj4WHx2r8T2yADC2b0U3QPAA0A439finsYMndByTD9+ElskzE9jT9CpwTEs1hjTcEbyvC5sjqTAD6ksfPGzHu4Cv+FCMZzFCrqDbqAC8jPbY7+DGqiG/s/ncRSjEAEREAEREAEREAEREAEREAEREAEREAEREAEREAEREAEREAEREAEREAEREAERSJvAJwrWjlXH8Up9AAAAAElFTkSuQmCC"
                />
            </defs>
        </svg>
        <svg
            width={128}
            height={128}
            viewBox="0 0 128 128"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            {...props}
            className={clsx(props.className, "block dark:hidden")}
        >
            <rect
                x={0.5}
                y={0.5}
                width={127}
                height={127}
                rx={63.5}
                fill="white"
                stroke="#CFD7E2"
            />
            <g filter="url(#filter0_dii_1231_6004)">
                <path
                    d="M64 58C67.3137 58 70 55.3137 70 52C70 48.6863 67.3137 46 64 46C60.6863 46 58 48.6863 58 52C58 55.3137 60.6863 58 64 58Z"
                    fill="url(#paint0_linear_1231_6004)"
                />
                <path
                    d="M64 58C67.3137 58 70 55.3137 70 52C70 48.6863 67.3137 46 64 46C60.6863 46 58 48.6863 58 52C58 55.3137 60.6863 58 64 58Z"
                    fill="url(#pattern0)"
                    fillOpacity={0.15}
                    style={{
                        mixBlendMode: "soft-light",
                    }}
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M58.6334 29.2669C62.0118 27.5777 65.9882 27.5777 69.3666 29.2669L93.3666 41.2669C97.432 43.2996 100 47.4547 100 52V76C100 80.5453 97.432 84.7004 93.3666 86.7331L69.3666 98.7331C65.9882 100.422 62.0118 100.422 58.6334 98.7331L34.6334 86.7331C30.568 84.7004 28 80.5453 28 76V52C28 47.4547 30.568 43.2996 34.6334 41.2669L58.6334 29.2669ZM52 52C52 45.3726 57.3726 40 64 40C70.6274 40 76 45.3726 76 52V76C76 82.6274 70.6274 88 64 88C57.3726 88 52 82.6274 52 76V52Z"
                    fill="url(#paint1_linear_1231_6004)"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M58.6334 29.2669C62.0118 27.5777 65.9882 27.5777 69.3666 29.2669L93.3666 41.2669C97.432 43.2996 100 47.4547 100 52V76C100 80.5453 97.432 84.7004 93.3666 86.7331L69.3666 98.7331C65.9882 100.422 62.0118 100.422 58.6334 98.7331L34.6334 86.7331C30.568 84.7004 28 80.5453 28 76V52C28 47.4547 30.568 43.2996 34.6334 41.2669L58.6334 29.2669ZM52 52C52 45.3726 57.3726 40 64 40C70.6274 40 76 45.3726 76 52V76C76 82.6274 70.6274 88 64 88C57.3726 88 52 82.6274 52 76V52Z"
                    fill="url(#pattern1)"
                    fillOpacity={0.15}
                    style={{
                        mixBlendMode: "soft-light",
                    }}
                />
            </g>
            <defs>
                <filter
                    id="filter0_dii_1231_6004"
                    x={12}
                    y={14}
                    width={104}
                    height={104}
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dy={2} />
                    <feGaussianBlur stdDeviation={8} />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1231_6004"
                    />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1231_6004"
                        result="shape"
                    />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dy={8} />
                    <feGaussianBlur stdDeviation={8} />
                    <feComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2={-1}
                        k3={1}
                    />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.1 0 0 0 0 0.5 0 0 0 0 0.7 0 0 0 0.75 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="shape"
                        result="effect2_innerShadow_1231_6004"
                    />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dx={-2} dy={2} />
                    <feComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2={-1}
                        k3={1}
                    />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.1 0 0 0 0 0.5 0 0 0 0 0.7 0 0 0 0.25 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="effect2_innerShadow_1231_6004"
                        result="effect3_innerShadow_1231_6004"
                    />
                </filter>
                <pattern
                    id="pattern0"
                    patternContentUnits="objectBoundingBox"
                    width={0.0833333}
                    height={0.0833333}
                >
                    <use
                        xlinkHref="#image0_1231_6004"
                        transform="scale(0.00130208)"
                    />
                </pattern>
                <pattern
                    id="pattern1"
                    patternContentUnits="objectBoundingBox"
                    width={0.0833333}
                    height={0.0833333}
                >
                    <use
                        xlinkHref="#image0_1231_6004"
                        transform="scale(0.00130208)"
                    />
                </pattern>
                <linearGradient
                    id="paint0_linear_1231_6004"
                    x1={64}
                    y1={28}
                    x2={64}
                    y2={100}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#0080FF" />
                    <stop offset={1} stopColor="#6EB3F7" />
                </linearGradient>
                <linearGradient
                    id="paint1_linear_1231_6004"
                    x1={64}
                    y1={28}
                    x2={64}
                    y2={100}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#0080FF" />
                    <stop offset={1} stopColor="#6EB3F7" />
                </linearGradient>
                <image
                    id="image0_1231_6004"
                    width={64}
                    height={64}
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAQKADAAQAAAABAAAAQAAAAABGUUKwAAAB+ElEQVR4Ae2ZjVGDQBCFxQqwA6xArCCWQCl2YAmaCowdWIJUIFYAHYQO8L2Tu0zMOJoJ3HLm7cwbfiZzb/e7DRyQXfwxhmHI8dMKWkElVEA8x+ihDmqgGnrNsozn0g8UXkCP0BY6Jp7x4yJZAkg+h1j4qcExfKekwQMJc9ZbaKpoMVAa3YBES4gJTx0tBiwX3QJIcOqZ/w6REBbVCZmfESTG/+k7NHeCHTxul3KXuEQyPh6wU/iDGbf0oNciwnXA2JZt5Iyu0QVdZM8DO98BFjNyf5CNwYls/O9vDbx7eLILuDULdkBl5J4beoeSCWAVjuLvWHq7agmgjF93cLT0DgCKkE78HUtvVy0vgkP8uneOuAiGxdjubLw9fxuM57gwJwLoDXOy9HZlE0BnCMDS25VNAB+GABpD7wDgzTCJ2tDbWfulcIuj3CCZK/Ol8JjAi0HxG+viWbMehx2Fr+fydcQuWGP2u4h+P1qFVdj4WHx2r8T2yADC2b0U3QPAA0A439finsYMndByTD9+ElskzE9jT9CpwTEs1hjTcEbyvC5sjqTAD6ksfPGzHu4Cv+FCMZzFCrqDbqAC8jPbY7+DGqiG/s/ncRSjEAEREAEREAEREAEREAEREAEREAEREAEREAEREAEREAEREAEREAEREAEREAERSJvAJwrWjlXH8Up9AAAAAElFTkSuQmCC"
                />
            </defs>
        </svg>
    </>
);

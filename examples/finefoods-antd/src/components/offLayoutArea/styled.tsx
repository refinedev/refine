import styled from "@emotion/styled";

export const ToggleContainer = styled.div`
   position: fixed;
    top: calc(50% - 28px);
    right: 0px;
    transform: translateX(101px);
    background-color: #fb7a32;
    text-align: center;
    padding: 6px 12px 6px 12px;
    border-top-left-radius: 99px;
    border-bottom-left-radius: 99px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: transform 0.3s ease-out;
    z-index: 2;

    &:hover {
        transform: translateX(0px);
    }

    a {
        color: white;
    }

    a:hover {
        text-decoration: underline;
    }

    svg {
        color: white;
        font-size: 24px;
        animation: bounce 1s alternate;
        animation-iteration-count: infinite;
    }
}

@keyframes bounce {
    from {
        transform: scale(1) translateX(0);
    }

    to {
        transform: scale(1.3) translateX(-2px);
    }
`;

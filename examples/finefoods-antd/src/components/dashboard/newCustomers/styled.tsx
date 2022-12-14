import styled from "@emotion/styled";

export const NewCustomersWrapper = styled.div`
    height: 232px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media screen and (max-width: 576px) {
        height: 212px;
    }
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

export const HeaderNumbers = styled.div`
    font-size: 28px;
    text-align: right;
    line-height: 1.2;

    div {
        font-size: 20px;
    }

    img {
        margin-left: 5px;
    }

    @media screen and (max-width: 576px) {
        font-size: 30px;

        div {
            font-size: 20px;
        }
    }
`;

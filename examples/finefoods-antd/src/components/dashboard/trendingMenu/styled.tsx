import styled from "@emotion/styled";

export const Container = styled.div`
    margin-bottom: 45px;

    @media screen and (max-width: 768px) {
        .menu-item {
            &__avatar {
                &-circle {
                    width: 28px;
                    height: 28px;
                    font-size: 10px;
                }
            }

            &__text {
                span {
                    font-size: 16px;
                }
            }
        }
    }
`;

export const AvatarWrapper = styled.div`
    position: relative;
`;

export const AvatarCircle = styled.div`
    background-color: #67be23;
    width: 44px;
    height: 44px;
    border-radius: 22px;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 100%;
    left: 50%;
    border: 4px solid #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-weight: 800;

    @media screen and (max-width: 768px) {
        width: 28px;
        height: 28px;
        font-size: 10px;
    }
`;

export const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;

    span {
        font-size: 16px;
    }

    @media screen and (max-width: 768px) {
        span {
            font-size: 16px;
        }
    }
`;

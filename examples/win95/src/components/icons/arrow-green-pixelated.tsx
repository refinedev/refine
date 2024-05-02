import styled from "styled-components";
import { getCdnUrl } from "../../utils/get-cdn-url";

export const ArrowGreenPixelatedIcon = () => {
  return (
    <Container>
      <StyledArrowGreenPixelatedIcon
        src={getCdnUrl("/arrow-green-pixelated.png")}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 12px;
`;

const StyledArrowGreenPixelatedIcon = styled.img`
  width: 100%;
  height: 100%;
  vertical-align: middle;
`;

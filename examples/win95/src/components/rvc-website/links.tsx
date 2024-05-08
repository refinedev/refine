import styled from "styled-components";
import { Link as ReactRouterLink } from "react-router-dom";

export const RVCWebsiteLinks = () => {
  return (
    <Container>
      <Button>
        <ReactRouterLink to="/rvc-website">Home</ReactRouterLink>
      </Button>
      <Button>
        <ReactRouterLink to="/rvc-website/catalog">Our Catalog</ReactRouterLink>
      </Button>
      <Button>
        <a href="https://refine.dev/" target="_blank" rel="noopener noreferrer">
          Refine Home
        </a>
      </Button>
      <Button>
        <a
          href="https://refine.dev/docs/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Documentation
        </a>
      </Button>
      <Button>
        <a
          href="https://refine.dev/tutorial/essentials/intro/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tutorial
        </a>
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  margin-left: auto;
  margin-right: auto;
  padding: 2px;
  border: 2px solid;
  gap: 2px;
  border-top-color: #b5b5b5;
  border-left-color: #b5b5b5;
  border-bottom-color: #707070;
  border-right-color: #707070;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  padding: 6px 12px;
  color: #00ccff;
  font-weight: bold;
  border: 2px solid;
  border-top-color: #707070;
  border-left-color: #707070;
  border-bottom-color: #b5b5b5;
  border-right-color: #b5b5b5;
`;

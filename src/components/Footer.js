import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  background-color: #18181d;
  color: white;
  padding: 1rem;
  text-align: center;
  position: sticky;
  bottom: 0;
  width: 100%;

  @media (max-width: 767px) {
    padding: 0.75rem;
    font-size: 0.875rem;
  }
`;

const Footer = () => {
  return <FooterContainer>Firaol Teshale &copy; 2024</FooterContainer>;
};

export default Footer;

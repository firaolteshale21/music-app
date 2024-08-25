//Footer component

import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  background-color: #18181d;
  color: white;
  padding: 10px;
  text-align: center;
  position: sticky;
`;

const Footer = () => {
    return (
        <FooterContainer>
            Firaol Teshale &copy; 2024
        </FooterContainer>
    );
};

export default Footer;
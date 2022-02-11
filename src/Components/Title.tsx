import styled from "styled-components";

export const Title = () => {
  return <TitlePage>Simulador de Investimentos</TitlePage>;
};

export const TitlePage = styled.h1`
  text-align: center;
  font-size: 2.8rem;

  @media (max-width: 450px) {
    font-size: 2rem;
  }
`;

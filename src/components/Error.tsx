import styled from "styled-components";

export const Error = () => {
  return (
    <>
      <ContainerLoading>
        <h2>Algo deu errado :(</h2>
      </ContainerLoading>
    </>
  );
};

export const ContainerLoading = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: #fcfefc;
  display: flex;
  align-items: center;
  justify-content: center;
`;

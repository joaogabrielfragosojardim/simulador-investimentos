import styled from "styled-components";

export const Loading = () => {
  return (
    <>
      <ContainerLoading>
        <img
          alt="loading gif"
          src={"https://c.tenor.com/tEBoZu1ISJ8AAAAC/spinning-loading.gif"}
        ></img>
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
 
  img {
    width: 20%;
    width: 20%;
  }
`;

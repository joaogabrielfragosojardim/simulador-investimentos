import styled from "styled-components";
import { AiOutlineInfoCircle, AiOutlineCheck } from "react-icons/ai";

export const Form = () => {
  return (
    <Container>
      <form>
        <Flex>
          <Content>
            <label>Rendimento</label>
            <AiOutlineInfoCircle />
          </Content>
          <Content>
            <label>Tipos de indexação</label>
            <AiOutlineInfoCircle />
          </Content>
        </Flex>
        <Flex>
          <FlexButtonYeld>
            <button>
              <AiOutlineCheck />
              Bruto
            </button>
            <button>
              <AiOutlineCheck />
              Líquido
            </button>
          </FlexButtonYeld>
          <FlexButtonIndex>
            <button>
              <AiOutlineCheck />
              PRÉ
            </button>
            <button>
              <AiOutlineCheck />
              POS
            </button>
            <button>
              <AiOutlineCheck />
              FIXADO
            </button>
          </FlexButtonIndex>
        </Flex>
        <Flex>
          <ContentInput>
            <label>Aporte Inicial</label>
            <input />
          </ContentInput>
          <ContentInput>
            <label>Aporte Mensal</label>
            <input />
          </ContentInput>
        </Flex>
        <Flex>
          <ContentInput>
            <label>Prazo (em meses)</label>
            <input />
          </ContentInput>
          <ContentInput>
            <label>Rentabilidade</label>
            <input />
          </ContentInput>
        </Flex>
        <Flex>
          <ContentInput>
            <label>IPCA (ao ano)</label>
            <input />
          </ContentInput>
          <ContentInput>
            <label>CDI (ao ano)</label>
            <input />
          </ContentInput>
        </Flex>
        <FlexButton>
          <button>Limpar campos</button>
          <button>Simular</button>
        </FlexButton>
      </form>
    </Container>
  );
};

export const Container = styled.div`
  margin-top: 50px;
  width: 45%;

  form {
    width: 100%;
  }
`;

export const Flex = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 30px 0px;
`;

export const Content = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;

  svg {
    font-size: 1.3rem;
  }
`;

export const ContentInput = styled.div`
  width: 40%;
  margin: 30px 0px;

  input {
    width: 100%;
    border: none;
    border-bottom: solid 1px black;
    padding: 15px 0px;
    margin-top: 10px;
  }
`;

export const FlexButtonYeld = styled.div`
  display: flex;
  width: 40%;

  button {
    width: 50%;
    font-size: 1rem;
    padding: 15px 30px;
    border: solid 1px black;
    display: flex;
    align-items: center;
    justify-content: center;

    &:first-child {
      border-radius: 15px 0px 0px 15px;
    }
    &:nth-child(2) {
      border-radius: 0px 15px 15px 0px;
    }

    svg {
      font-size: 0.8rem;
    }
  }
`;

export const FlexButtonIndex = styled.div`
  display: flex;
  width: 40%;

  button {
    width: 33.3%;
    font-size: 1rem;
    border: solid 1px black;
    display: flex;
    align-items: center;
    justify-content: center;

    &:first-child {
      border-radius: 15px 0px 0px 15px;
    }
    &:nth-child(3) {
      border-radius: 0px 15px 15px 0px;
    }

    svg {
      font-size: 0.8rem;
    }
  }
`;

export const FlexButton = styled.div`
  width: 100%;

  display: flex;

  button {
    border: solid 1px black;
    font-weight: bold;
    padding: 20px;
    width: 100%;
    border-radius: 15px;
    font-size: 1.3rem;
    &:first-child {
      margin-right: 10px;
    }
    &:nth-child(2) {
      margin-left: 10px;
    }
  }
`;

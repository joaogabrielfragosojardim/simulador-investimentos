import styled from "styled-components";
import { AiOutlineInfoCircle, AiOutlineCheck } from "react-icons/ai";

import { useState } from "react";
import NumberFormat from "react-number-format";

export const Form = () => {
  const initialValuesForm = {
    yeld: "",
    indexType: "",
    contribuition: "",
    monthContribuition: "",
    deadline: "",
    profitability: "",
    IPCA: "",
    CDI: "",
  };

  const [valuesForm, setValuesForm] = useState({ ...initialValuesForm });
  const disabled = Object.values(valuesForm).includes("");

  const resetValues = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setValuesForm(initialValuesForm);
  };

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
            <NumberFormat
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValuesForm({ ...valuesForm, contribuition: e.target.value });
              }}
              value={valuesForm.contribuition}
              thousandSeparator={"."}
              decimalSeparator={","}
              decimalScale={2}
              prefix={"R$ "}
            />
          </ContentInput>
          <ContentInput>
            <label>Aporte Mensal</label>
            <NumberFormat
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValuesForm({
                  ...valuesForm,
                  monthContribuition: e.target.value,
                });
              }}
              value={valuesForm.monthContribuition}
              thousandSeparator={"."}
              decimalSeparator={","}
              decimalScale={2}
              prefix={"R$ "}
            />{" "}
          </ContentInput>
        </Flex>
        <Flex>
          <ContentInput>
            <label>Prazo (em meses)</label>
            <input
              type="number"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValuesForm({ ...valuesForm, deadline: e.target.value });
              }}
              value={valuesForm.deadline}
            />
          </ContentInput>
          <ContentInput>
            <label>Rentabilidade</label>
            <NumberFormat
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValuesForm({ ...valuesForm, profitability: e.target.value });
              }}
              value={valuesForm.profitability}
              decimalSeparator={","}
              suffix={"%"}
            />
          </ContentInput>
        </Flex>
        <Flex>
          <ContentInput>
            <label>IPCA (ao ano)</label>
            <NumberFormat
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValuesForm({ ...valuesForm, IPCA: e.target.value });
              }}
              value={valuesForm.IPCA}
              decimalSeparator={","}
              suffix={"%"}
            />{" "}
          </ContentInput>
          <ContentInput>
            <label>CDI (ao ano)</label>
            <NumberFormat
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValuesForm({ ...valuesForm, CDI: e.target.value });
              }}
              value={valuesForm.CDI}
              decimalSeparator={","}
              suffix={"%"}
            />{" "}
          </ContentInput>
        </Flex>
        <FlexButton>
          <button
            onClick={(e) => {
              resetValues(e);
            }}
          >
            Limpar campos
          </button>
          <button disabled={disabled} type="submit">
            Simular
          </button>
        </FlexButton>
      </form>
    </Container>
  );
};

export const Container = styled.div`
  margin-top: 50px;
  width: 40%;

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
    font-size: 1.2rem;
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

    &:hover {
      cursor: pointer;
    }

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

    &:hover {
      cursor: pointer;
    }

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

    &:hover {
      cursor: pointer;
    }

    &:first-child {
      margin-right: 10px;
    }
    &:nth-child(2) {
      margin-left: 10px;
      border: solid 1px #ed8e53;
      background: #ed8e53;
      transition: 0.5s;

      &:disabled {
        background: #969696;
        color: black;
        border: solid 1px black;
      }
    }
  }
`;

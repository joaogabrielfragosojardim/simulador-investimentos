import styled from "styled-components";
import { AiOutlineInfoCircle, AiOutlineCheck } from "react-icons/ai";

import { MoneyInput } from "../Components/MoneyInput";
import { PercentageInput } from "../Components/PercentageInput";

interface ISelectedButton {
  selected: string;
}

interface IValuesForm {
  yeld: string;
  indexType: string;
  contribuition: string;
  monthContribuition: string;
  deadline: string;
  profitability: string;
  IPCA: string;
  CDI: string;
}

interface IProps {
  initialValuesForm: IValuesForm;
  valuesForm: IValuesForm;
  setValuesForm: React.Dispatch<React.SetStateAction<IValuesForm>>;
}

export const Form = ({
  initialValuesForm,
  valuesForm,
  setValuesForm,
}: IProps) => {
  const disabled = Object.values(valuesForm).includes("");

  const resetValues = (c: React.MouseEvent<HTMLElement>) => {
    c.preventDefault();
    setValuesForm({
      ...initialValuesForm,
      IPCA: valuesForm.IPCA,
      CDI: valuesForm.CDI,
    });
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
          <FlexButtonYeld selected={valuesForm.yeld}>
            <button
              onClick={(c: React.MouseEvent<HTMLElement>) => {
                c.preventDefault();
                setValuesForm({ ...valuesForm, yeld: "BRUTO" });
              }}
            >
              <AiOutlineCheck />
              Bruto
            </button>
            <button
              onClick={(c: React.MouseEvent<HTMLElement>) => {
                c.preventDefault();
                setValuesForm({ ...valuesForm, yeld: "LIQUIDO" });
              }}
            >
              <AiOutlineCheck />
              Líquido
            </button>
          </FlexButtonYeld>
          <FlexButtonIndex selected={valuesForm.indexType}>
            <button
              onClick={(c: React.MouseEvent<HTMLElement>) => {
                c.preventDefault();
                setValuesForm({ ...valuesForm, indexType: "PRE" });
              }}
            >
              <AiOutlineCheck />
              PRÉ
            </button>
            <button
              onClick={(c: React.MouseEvent<HTMLElement>) => {
                c.preventDefault();
                setValuesForm({ ...valuesForm, indexType: "POS" });
              }}
            >
              <AiOutlineCheck />
              POS
            </button>
            <button
              onClick={(c: React.MouseEvent<HTMLElement>) => {
                c.preventDefault();
                setValuesForm({ ...valuesForm, indexType: "FIXADO" });
              }}
            >
              <AiOutlineCheck />
              FIXADO
            </button>
          </FlexButtonIndex>
        </Flex>
        <Flex>
          <MoneyInput
            label={"Aporte Inicial"}
            valuesForm={valuesForm}
            setValuesForm={setValuesForm}
            change={"contribuition"}
          />
          <MoneyInput
            label={"Aporte Mensal"}
            valuesForm={valuesForm}
            setValuesForm={setValuesForm}
            change={"mounthContribuition"}
          />
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
          <PercentageInput
            label={"Rentabilidade"}
            valuesForm={valuesForm}
            setValuesForm={setValuesForm}
            change={"profitability"}
          />
        </Flex>
        <Flex>
          <PercentageInput
            label={"IPCA (ao ano)"}
            valuesForm={valuesForm}
            setValuesForm={setValuesForm}
            change={"IPCA"}
          />
          <PercentageInput
            label={"CDI (ao ano)"}
            valuesForm={valuesForm}
            setValuesForm={setValuesForm}
            change={"CDI"}
          />
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

    &:disabled {
      color: black;
    }
  }
`;

export const FlexButtonYeld = styled.div<ISelectedButton>`
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
      background: ${(props) =>
        props.selected === "BRUTO" ? "#ed8e53" : "efefef"};
      color: ${(props) => (props.selected === "BRUTO" ? "white" : "black")};

      svg {
        font-size: 0.8rem;
        display: ${(props) => (props.selected === "BRUTO" ? "inline" : "none")};
      }
    }
    &:nth-child(2) {
      border-radius: 0px 15px 15px 0px;
      background: ${(props) =>
        props.selected === "LIQUIDO" ? "#ed8e53" : "efefef"};
      color: ${(props) => (props.selected === "LIQUIDO" ? "white" : "black")};

      svg {
        font-size: 0.8rem;
        display: ${(props) =>
          props.selected === "LIQUIDO" ? "inline" : "none"};
      }
    }
  }
`;

export const FlexButtonIndex = styled.div<ISelectedButton>`
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
      background: ${(props) =>
        props.selected === "PRE" ? "#ed8e53" : "efefef"};
      color: ${(props) => (props.selected === "PRE" ? "white" : "black")};

      svg {
        font-size: 0.8rem;
        display: ${(props) => (props.selected === "PRE" ? "inline" : "none")};
      }
    }
    &:nth-child(2) {
      background: ${(props) =>
        props.selected === "POS" ? "#ed8e53" : "efefef"};
      color: ${(props) => (props.selected === "POS" ? "white" : "black")};

      svg {
        font-size: 0.8rem;
        display: ${(props) => (props.selected === "POS" ? "inline" : "none")};
      }
    }
    &:nth-child(3) {
      border-radius: 0px 15px 15px 0px;
      background: ${(props) =>
        props.selected === "FIXADO" ? "#ed8e53" : "efefef"};
      color: ${(props) => (props.selected === "FIXADO" ? "white" : "black")};

      svg {
        font-size: 0.8rem;
        display: ${(props) =>
          props.selected === "FIXADO" ? "inline" : "none"};
      }
    }

    svg {
      font-size: 0.8rem;
      display: none;
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

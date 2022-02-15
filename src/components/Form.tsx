import styled from "styled-components";
import { AiOutlineInfoCircle, AiOutlineCheck } from "react-icons/ai";
import NumberFormat from "react-number-format";

import { MoneyInput } from "./MoneyInput";
import { PercentageInput } from "./PercentageInput";
import { theme } from "../styles/theme";

import { indexType } from "../constants/indexType";
import { yeldType } from "../constants/yeldType";
import { api } from "../services/api";
import { IDataDashboard } from "../renaming/Home";
import { useMutation } from "react-query";

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

export interface IErrorsForm {
  contribuition: boolean;
  monthContribuition: boolean;
  deadline: boolean;
  profitability: boolean;
}

interface IInput {
  errors: boolean;
}

interface IProps {
  initialValuesForm: IValuesForm;
  valuesForm: IValuesForm;
  setValuesForm: React.Dispatch<React.SetStateAction<IValuesForm>>;
  setDataDashboard: React.Dispatch<React.SetStateAction<IDataDashboard>>;
  errorsForm: IErrorsForm;
  setErrorsForm: React.Dispatch<React.SetStateAction<IErrorsForm>>;
}

interface IMutateProps {
  indexType: string;
  yeld: string;
}

export const Form = ({
  initialValuesForm,
  valuesForm,
  setValuesForm,
  setDataDashboard,
  errorsForm,
  setErrorsForm,
}: IProps) => {
  const disabled =
    Object.values(valuesForm).includes("") ||
    Object.values(valuesForm).includes("NaN") ||
    Object.values(errorsForm).includes(true);

  const resetValues = (c: React.MouseEvent<HTMLElement>) => {
    c.preventDefault();
    setValuesForm({
      ...initialValuesForm,
      IPCA: valuesForm.IPCA,
      CDI: valuesForm.CDI,
    });
  };

  const dashboardValuesMutation = useMutation(
    ({ indexType, yeld }: IMutateProps) =>
      api.get(`/simulacoes?tipoIndexacao=${indexType}&tipoRendimento=${yeld}`),
    {
      onSuccess: (data) => {
        const formatedData = data.data[0];
        setDataDashboard(formatedData);
      },
    }
  );

  const getData = (c: React.FormEvent<HTMLElement>) => {
    c.preventDefault();
    dashboardValuesMutation.mutate({
      indexType: valuesForm.indexType,
      yeld: valuesForm.yeld,
    });
  };

  return (
    <Container>
      <form
        onSubmit={(c) => {
          getData(c);
        }}
      >
        <Flex>
          <ContainerButtons>
            <Content>
              <label>Rendimento</label>
              <AiOutlineInfoCircle />
            </Content>
            <FlexButtonYeld selected={valuesForm.yeld}>
              <button
                onClick={(c: React.MouseEvent<HTMLElement>) => {
                  c.preventDefault();
                  setValuesForm({ ...valuesForm, yeld: yeldType.BRUTO });
                }}
              >
                <AiOutlineCheck />
                Bruto
              </button>
              <button
                onClick={(c: React.MouseEvent<HTMLElement>) => {
                  c.preventDefault();
                  setValuesForm({ ...valuesForm, yeld: yeldType.LIQUIDO });
                }}
              >
                <AiOutlineCheck />
                Líquido
              </button>
            </FlexButtonYeld>
          </ContainerButtons>
          <ContainerButtons>
            <Content>
              <label>Tipos de indexação</label>
              <AiOutlineInfoCircle />
            </Content>
            <FlexButtonIndex selected={valuesForm.indexType}>
              <button
                onClick={(c: React.MouseEvent<HTMLElement>) => {
                  c.preventDefault();
                  setValuesForm({ ...valuesForm, indexType: indexType.PRE });
                }}
              >
                <AiOutlineCheck />
                PRÉ
              </button>
              <button
                onClick={(c: React.MouseEvent<HTMLElement>) => {
                  c.preventDefault();
                  setValuesForm({ ...valuesForm, indexType: indexType.POS });
                }}
              >
                <AiOutlineCheck />
                POS
              </button>
              <button
                onClick={(c: React.MouseEvent<HTMLElement>) => {
                  c.preventDefault();
                  setValuesForm({
                    ...valuesForm,
                    indexType: indexType.FIXADO,
                  });
                }}
              >
                <AiOutlineCheck />
                FIXADO
              </button>
            </FlexButtonIndex>
          </ContainerButtons>
        </Flex>
        <Flex></Flex>
        <Flex>
          <MoneyInput
            label={"Aporte Inicial"}
            valuesForm={valuesForm}
            setValuesForm={setValuesForm}
            errorsForm={errorsForm}
            setErrorsForm={setErrorsForm}
            change={"contribuition"}
          />
          <MoneyInput
            label={"Aporte Mensal"}
            valuesForm={valuesForm}
            setValuesForm={setValuesForm}
            errorsForm={errorsForm}
            setErrorsForm={setErrorsForm}
            change={"monthContribuition"}
          />
        </Flex>
        <Flex>
          <ContentInput errors={errorsForm.deadline}>
            <label>Prazo (em meses)</label>
            <NumberFormat
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                parseInt(e.target.value) < 1 || parseInt(e.target.value) > 24
                  ? setErrorsForm({ ...errorsForm, deadline: true })
                  : setErrorsForm({ ...errorsForm, deadline: false });
                setValuesForm({
                  ...valuesForm,
                  deadline: parseInt(e.target.value).toString(),
                });
              }}
              value={valuesForm.deadline}
              decimalScale={0}
            />
            <h3>Valor invalido</h3>
          </ContentInput>
          <PercentageInput
            label={"Rentabilidade"}
            valuesForm={valuesForm}
            setValuesForm={setValuesForm}
            errorsForm={errorsForm}
            setErrorsForm={setErrorsForm}
            change={"profitability"}
          />
        </Flex>
        <Flex>
          <PercentageInput
            label={"IPCA (ao ano)"}
            valuesForm={valuesForm}
            setValuesForm={setValuesForm}
            change={indexType.FIXADO}
          />
          <PercentageInput
            label={"CDI (ao ano)"}
            valuesForm={valuesForm}
            setValuesForm={setValuesForm}
            change={indexType.CDI}
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
  form {
    width: 100%;
  }
`;

export const Flex = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 20px 0px;

  @media (max-width: 700px) {
    flex-direction: column;
    margin-top: 10px;
  }
`;

export const ContainerButtons = styled.div`
  width: 40%;

  @media (max-width: 700px) {
    width: 100%;
    margin-top: 20px;
  }
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  @media (max-width: 700px) {
    width: 100%;
  }

  svg {
    font-size: 1.3rem;
  }
`;

export const ContentInput = styled.div<IInput>`
  width: 40%;
  margin: 15px 0px;
  color: ${(props) => (!props.errors ? theme.colors.black : theme.colors.red)};

  @media (max-width: 700px) {
    width: 100%;
  }

  input {
    width: 100%;
    border: none;
    border-bottom: solid 1px
      ${(props) => (!props.errors ? theme.colors.black : theme.colors.red)};
    color: ${(props) =>
      !props.errors ? theme.colors.black : theme.colors.red};
    padding: 15px 0px;
    margin-top: 10px;
    font-size: 1.4rem;

    &:disabled {
      color: ${theme.colors.black};
    }
  }

  h3 {
    margin-top: 15px;
    visibility: ${(props) => (!props.errors ? "hidden" : "visible")};
    font-weight: 300;
  }
`;

export const FlexButtonYeld = styled.div<ISelectedButton>`
  display: flex;

  @media (max-width: 700px) {
    width: 100%;
  }

  button {
    width: 50%;
    font-size: 1rem;
    padding: 20px 30px;
    border: solid 1px ${theme.colors.black};
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      cursor: pointer;
    }

    &:first-child {
      border-radius: 15px 0px 0px 15px;
      background: ${(props) =>
        props.selected === yeldType.BRUTO
          ? theme.colors.principal
          : theme.colors.secondary};
      color: ${(props) =>
        props.selected === yeldType.BRUTO
          ? theme.colors.white
          : theme.colors.black};

      svg {
        font-size: 0.8rem;
        display: ${(props) =>
          props.selected === yeldType.BRUTO ? "inline" : "none"};

        @media (max-width: 450px) {
          display: none;
        }
      }
    }
    &:nth-child(2) {
      border-radius: 0px 15px 15px 0px;
      background: ${(props) =>
        props.selected === yeldType.LIQUIDO
          ? theme.colors.principal
          : theme.colors.secondary};
      color: ${(props) =>
        props.selected === yeldType.LIQUIDO
          ? theme.colors.white
          : theme.colors.black};

      svg {
        font-size: 0.8rem;
        display: ${(props) =>
          props.selected === yeldType.LIQUIDO ? "inline" : "none"};
        @media (max-width: 450px) {
          display: none;
        }
      }
    }
  }
`;

export const FlexButtonIndex = styled.div<ISelectedButton>`
  display: flex;

  @media (max-width: 700px) {
    width: 100%;
  }

  button {
    width: 33.3%;
    font-size: 1rem;
    border: solid 1px ${theme.colors.black};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 5px;

    &:hover {
      cursor: pointer;
    }

    &:first-child {
      border-radius: 15px 0px 0px 15px;
      background: ${(props) =>
        props.selected === indexType.PRE
          ? theme.colors.principal
          : theme.colors.secondary};
      color: ${(props) =>
        props.selected === indexType.PRE
          ? theme.colors.white
          : theme.colors.black};

      svg {
        font-size: 0.8rem;
        display: ${(props) =>
          props.selected === indexType.PRE ? "inline" : "none"};
        @media (max-width: 450px) {
          display: none;
        }
      }
    }
    &:nth-child(2) {
      background: ${(props) =>
        props.selected === indexType.POS
          ? theme.colors.principal
          : theme.colors.secondary};
      color: ${(props) =>
        props.selected === indexType.POS
          ? theme.colors.white
          : theme.colors.black};

      svg {
        font-size: 0.8rem;
        display: ${(props) =>
          props.selected === indexType.POS ? "inline" : "none"};
        @media (max-width: 450px) {
          display: none;
        }
      }
    }
    &:nth-child(3) {
      border-radius: 0px 15px 15px 0px;
      background: ${(props) =>
        props.selected === indexType.FIXADO
          ? theme.colors.principal
          : theme.colors.secondary};
      color: ${(props) =>
        props.selected === indexType.FIXADO
          ? theme.colors.white
          : theme.colors.black};

      svg {
        font-size: 0.8rem;
        display: ${(props) =>
          props.selected === indexType.FIXADO ? "inline" : "none"};
        @media (max-width: 450px) {
          display: none;
        }
      }
    }
  }
`;

export const FlexButton = styled.div`
  width: 100%;

  display: flex;

  @media (max-width: 700px) {
    flex-direction: column;
  }

  button {
    border: solid 1px ${theme.colors.black};
    font-weight: bold;
    padding: 25px 20px;
    width: 100%;
    border-radius: 15px;
    font-size: 1.3rem;

    &:hover {
      cursor: pointer;
    }

    &:first-child {
      margin-right: 10px;

      @media (max-width: 700px) {
        margin: 20px 0px;
      }
    }
    &:nth-child(2) {
      margin-left: 10px;
      border: solid 1px ${theme.colors.principal};
      background: ${theme.colors.principal};
      transition: 0.5s;

      @media (max-width: 700px) {
        margin: 0;
      }

      &:disabled {
        background: ${theme.colors.disabled};
        color: ${theme.colors.black};
        border: solid 1px ${theme.colors.black};
        cursor: default;
      }
    }
  }
`;

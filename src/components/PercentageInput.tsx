import styled from "styled-components";
import NumberFormat from "react-number-format";

import { indexType } from "../constants/indexType";
import { IErrorsForm } from "./Form";
import { theme } from "../styles/theme";

interface iProps {
  valuesForm: any;
  setValuesForm: any;
  label: string;
  change: string;
  errorsForm?: IErrorsForm;
  setErrorsForm?: React.Dispatch<React.SetStateAction<IErrorsForm>>;
}

interface IContentInput {
  errors?: boolean;
}

export const PercentageInput = ({
  valuesForm,
  setValuesForm,
  label,
  change,
  errorsForm,
  setErrorsForm,
}: iProps) => {
  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (change) {
      case indexType.FIXADO: {
        setValuesForm({ ...valuesForm, IPCA: e.target.value });
        break;
      }
      case indexType.CDI: {
        setValuesForm({ ...valuesForm, CDI: e.target.value });
        break;
      }
      case "profitability": {
        const valueArray = e.target.value.split("");

        if (errorsForm !== undefined && setErrorsForm !== undefined) {
          valueArray[0] === "0" || valueArray[0] === ","
            ? setErrorsForm({ ...errorsForm, profitability: true })
            : setErrorsForm({ ...errorsForm, profitability: false });
        }

        setValuesForm({ ...valuesForm, profitability: e.target.value });
        break;
      }
    }
  };

  const Input = () => {
    switch (change) {
      case indexType.FIXADO: {
        return (
          <ContentInput>
            <label>{label}</label>
            <NumberFormat
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                changeValue(e);
              }}
              value={valuesForm.IPCA}
              decimalSeparator={","}
              suffix={"%"}
              disabled
            />
          </ContentInput>
        );
      }
      case indexType.CDI: {
        return (
          <ContentInput>
            <label>{label}</label>
            <NumberFormat
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                changeValue(e);
              }}
              value={valuesForm.CDI}
              decimalSeparator={","}
              suffix={"%"}
              disabled
            />
          </ContentInput>
        );
      }
      case "profitability": {
        return (
          <ContentInput errors={errorsForm?.profitability}>
            <label>{label}</label>
            <NumberFormat
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                changeValue(e);
              }}
              value={valuesForm.profitability}
              decimalSeparator={","}
              suffix={"%"}
            />
            <h3>Valor invalido</h3>
          </ContentInput>
        );
      }
    }
  };

  return <>{Input()}</>;
};

export const ContentInput = styled.div<IContentInput>`
  width: 40%;
  margin: 25px 0px;
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
      color: black;
    }
  }

  h3 {
    margin-top: 15px;
    visibility: ${(props) => (!props.errors ? "hidden" : "visible")};
    font-weight: 300;
  }
`;

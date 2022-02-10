import styled from "styled-components";
import NumberFormat from "react-number-format";
import { useState } from "react";

import { theme } from "../styles/theme";
import { IErrorsForm } from "./Form";

interface iProps {
  valuesForm: any;
  setValuesForm: any;
  label: string;
  change: string;
  errorsForm: IErrorsForm;
  setErrorsForm: React.Dispatch<React.SetStateAction<IErrorsForm>>;
}

interface IContentInputProps {
  errors: boolean;
}

export const MoneyInput = ({
  valuesForm,
  setValuesForm,
  label,
  change,
  errorsForm,
  setErrorsForm,
}: iProps) => {
  useState(false);

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (change) {
      case "contribuition": {
        const valueArray = e.target.value.split("");
        valueArray[3] === "0" || valueArray[3] === ","
          ? setErrorsForm({ ...errorsForm, contribuition: true })
          : setErrorsForm({ ...errorsForm, contribuition: false });
        setValuesForm({ ...valuesForm, contribuition: e.target.value });
        break;
      }
      case "monthContribuition": {
        const valueArray = e.target.value.split("");
        valueArray[3] === "0" || valueArray[3] === ","
          ? setErrorsForm({ ...errorsForm, monthContribuition: true })
          : setErrorsForm({ ...errorsForm, monthContribuition: false });
        setValuesForm({ ...valuesForm, monthContribuition: e.target.value });
        break;
      }
    }
  };

  const input = () => {
    switch (change) {
      case "contribuition": {
        return (
          <>
            <ContentInput errors={errorsForm.contribuition}>
              <label>{label}</label>
              <NumberFormat
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  changeValue(e);
                }}
                value={valuesForm.contribuition}
                thousandSeparator={"."}
                decimalSeparator={","}
                decimalScale={2}
                prefix={"R$ "}
              />
              <h3>Valor invalido</h3>
            </ContentInput>
          </>
        );
      }
      case "monthContribuition": {
        return (
          <ContentInput errors={errorsForm.monthContribuition}>
            <label>{label}</label>
            <NumberFormat
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                changeValue(e);
              }}
              value={valuesForm.monthContribuition}
              thousandSeparator={"."}
              decimalSeparator={","}
              decimalScale={2}
              prefix={"R$ "}
            />
            <h3>Valor invalido</h3>
          </ContentInput>
        );
      }
    }
  };

  return <>{input()}</>;
};

export const ContentInput = styled.div<IContentInputProps>`
  width: 40%;
  margin: 15px 0px;
  color: ${(props) => (!props.errors ? theme.colors.black : theme.colors.red)};
  input {
    width: 100%;
    border: none;
    border-bottom: solid 1px
      ${(props) => (!props.errors ? theme.colors.black : theme.colors.red)};
    color: ${(props) =>
      !props.errors ? theme.colors.black : theme.colors.red};
    padding: 15px 0px;
    margin-top: 5px;
    font-size: 1.4rem;
  }
  h3 {
    margin-top: 15px;
    visibility: ${(props) => (!props.errors ? "hidden" : "visible")};
    font-weight: 300;
  }
`;

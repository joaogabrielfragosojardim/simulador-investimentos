import styled from "styled-components";
import NumberFormat from "react-number-format";

interface iProps {
  valuesForm: any;
  setValuesForm: any;
  label: string;
  change: string;
}

export const MoneyInput = ({
  valuesForm,
  setValuesForm,
  label,
  change,
}: iProps) => {
  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (change) {
      case "contribuition": {
        setValuesForm({ ...valuesForm, contribuition: e.target.value });
        break;
      }
      case "monthContribuition": {
        setValuesForm({ ...valuesForm, monthContribuition: e.target.value });
        break;
      }
    }
  };

  const input = () => {
    switch (change) {
      case "contribuition": {
        return (
          <ContentInput>
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
          </ContentInput>
        );
      }
      case "monthContribuition": {
        return (
          <ContentInput>
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
          </ContentInput>
        );
      }
    }
  };

  return <>{input()}</>;
};

export const ContentInput = styled.div`
  width: 40%;
  margin: 25px 0px;

  input {
    width: 100%;
    border: none;
    border-bottom: solid 1px black;
    padding: 15px 0px;
    margin-top: 10px;
    font-size: 1.4rem;

    &:disabled {
      color: black;
    }
  }
`;

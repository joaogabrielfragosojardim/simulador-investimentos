import styled from "styled-components";
import NumberFormat from "react-number-format";

interface iProps {
  valuesForm: any;
  setValuesForm: any;
  label: string;
  change: string;
}

export const PercentageInput = ({
  valuesForm,
  setValuesForm,
  label,
  change,
}: iProps) => {
  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (change) {
      case "IPCA": {
        setValuesForm({ ...valuesForm, IPCA: e.target.value });
        break;
      }
      case "CDI": {
        setValuesForm({ ...valuesForm, CDI: e.target.value });
        break;
      }
      case "profitability": {
        setValuesForm({ ...valuesForm, profitability: e.target.value });
        break;
      }
    }
  };

  const input = () => {
    switch (change) {
      case "IPCA": {
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
            />
          </ContentInput>
        );
      }
      case "CDI": {
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
            />
          </ContentInput>
        );
      }
      case "profitability": {
        return (
          <ContentInput>
            <label>{label}</label>
            <NumberFormat
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                changeValue(e);
              }}
              decimalSeparator={","}
              suffix={"%"}
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

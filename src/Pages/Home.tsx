import { Form } from "../components/Form";
import { Dashboard } from "../components/Dashboard";
import { Title } from "../components/Title";
import { SubTitle } from "../components/SubTitle";

import { useState, useEffect } from "react";
import { api } from "../services/api";

import styled from "styled-components";

export interface IDataDashboard {
  valorFinalBruto?: number;
  aliquotaIR?: number;
  valorPagoIR?: number;
  valorTotalInvestido?: number;
  valorFinalLiquido?: number;
  ganhoLiquido?: number;
  graficoValores?: {
    comAporte: { [key: string]: number };
    semAporte: { [key: string]: number };
  };
}

export const Home = () => {
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
  const [dataDashboard, setDataDashboard] = useState<IDataDashboard>({});

  useEffect(() => {
    api.get("/indicadores").then((resp) => {
      setValuesForm({
        ...valuesForm,
        CDI: resp.data[0].valor,
        IPCA: resp.data[1].valor,
      });
    });
  }, []);

  return (
    <>
      <Title />
      <Container>
        <div>
          <SubTitle subtitle={"Simulador"} />
          <Form
            initialValuesForm={initialValuesForm}
            valuesForm={valuesForm}
            setValuesForm={setValuesForm}
            setDataDashboard={setDataDashboard}
          />
        </div>
        <ContainerDashboard>
          {dataDashboard.valorFinalBruto !== undefined && (
            <>
              <SubTitle subtitle={"Resultados da simulação"} />
              <Dashboard dataDashboard={dataDashboard} />
            </>
          )}
        </ContainerDashboard>
      </Container>
    </>
  );
};

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ContainerDashboard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

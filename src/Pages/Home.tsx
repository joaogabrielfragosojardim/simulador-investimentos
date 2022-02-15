import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { Dashboard } from "../components/Dashboard";
import { Error } from "../components/Error";
import { Form } from "../components/Form";
import { Loading } from "../components/Loading";
import { SubTitle } from "../components/SubTitle";
import { Title } from "../components/Title";
import { getIndicators } from "../services/getIndicators";

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
  //Por se tratar de uma aplicação single page optei por deixar os estados dentro da Home e não utilizar Context API
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
  const [errorsForm, setErrorsForm] = useState({
    contribuition: false,
    monthContribuition: false,
    deadline: false,
    profitability: false,
  });

  const [dataDashboard, setDataDashboard] = useState<IDataDashboard>({});

  //Utilização do useQuery para melhor trabalho com a requisição
  const { isLoading, error } = useQuery("indicators", () => getIndicators(), {
    onSuccess: (data) => {
      setValuesForm({
        ...valuesForm,
        IPCA: data?.IPCA,
        CDI: data?.CDI,
      });
    },
    staleTime: 1000 * 30, // 30 minutos
  });

  if (isLoading) return <Loading />;

  if (error) return <Error />;

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
            errorsForm={errorsForm}
            setErrorsForm={setErrorsForm}
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

  @media (max-width: 1600px) {
    flex-direction: column;
  }
`;

export const ContainerDashboard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 30px;

  @media (max-width: 1600px) {
    margin-left: 0;
    margin-top: 50px;
  }
`;

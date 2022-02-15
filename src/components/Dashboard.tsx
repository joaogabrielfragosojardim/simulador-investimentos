import styled from "styled-components";
import { IDataDashboard } from "../renaming/Home";
import { theme } from "../styles/theme";

import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";

interface iProps {
  dataDashboard: IDataDashboard;
}

interface iCards {
  green?: boolean;
}

interface iContribuition {
  color: string;
}

export const Dashboard = ({ dataDashboard }: iProps) => {
  const toRealMoney = (money: number | undefined) => {
    return money?.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };

  const valuesWithContribuition = dataDashboard.graficoValores?.comAporte
    ? Object.values(dataDashboard.graficoValores?.comAporte)
    : [];

  const valuesWithoutContribuition = dataDashboard.graficoValores?.semAporte
    ? Object.values(dataDashboard.graficoValores?.semAporte)
    : [];

  const data = valuesWithContribuition.map((value, index) => ({
    month: index,
    contribuition: value,
    withoutContribuiton: valuesWithoutContribuition[index],
  }));

  return (
    <>
      <ContainerCards>
        <Cards>
          <h3>Valor Final Bruto</h3>
          <h4>{toRealMoney(dataDashboard.valorFinalBruto)}</h4>
        </Cards>
        <Cards>
          <h3>Alíquota IR</h3>
          <h4>{`${dataDashboard.aliquotaIR}%`}</h4>
        </Cards>
        <Cards>
          <h3>Valor Pago em IR</h3>
          <h4>{toRealMoney(dataDashboard.valorPagoIR)}</h4>
        </Cards>
        <Cards green={true}>
          <h3>Valor Final Líquido</h3>
          <h4>{toRealMoney(dataDashboard.valorFinalLiquido)}</h4>
        </Cards>
        <Cards>
          <h3>Valor Total Investido</h3>
          <h4>{toRealMoney(dataDashboard.valorTotalInvestido)}</h4>
        </Cards>
        <Cards green={true}>
          <h3>Ganho Líquido</h3>
          <h4>{toRealMoney(dataDashboard.ganhoLiquido)}</h4>
        </Cards>
      </ContainerCards>
      <ContainerChart>
        <h3>Projeção de Valores</h3>
        <ContentChart>
          <ResponsiveContainer width={"99%"} height={400}>
            <BarChart data={data}>
              <XAxis dataKey="month" />
              <Bar
                dataKey="withoutContribuiton"
                stackId="money"
                fill={theme.colors.black}
                stroke={theme.colors.secondary}
                strokeWidth={3}
              />
              +
              <Bar
                stroke={theme.colors.secondary}
                strokeWidth={3}
                dataKey="contribuition"
                stackId="money"
                fill={theme.colors.principal}
              />
            </BarChart>
          </ResponsiveContainer>
        </ContentChart>
        <h5>Tempo (meses)</h5>
        <ContainerInfos>
          <div>
            <Circles color={theme.colors.principal} />
            <h4>Com aporte</h4>
          </div>
          <div>
            <Circles color={theme.colors.black} />
            <h4>Sem aporte</h4>
          </div>
        </ContainerInfos>
      </ContainerChart>
    </>
  );
};

export const ContainerCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 50px 80px;

  @media (max-width: 850px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }

  @media (max-width: 550px) {
    grid-template-columns: 1fr;
  }
`;

export const Cards = styled.div<iCards>`
  text-align: center;
  padding: 5px 25px;
  box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  h4 {
    margin-top: 30px;
    font-weight: ${(props) => (props.green ? "bold" : 300)};
    color: ${(props) => (props.green ? "green" : theme.colors.black)};
    font-size: 1.2rem;
  }
`;

export const ContainerChart = styled.div`
  margin-top: 20px;

  h5 {
    text-align: center;
  }

  @media (max-width: 1600px) {
    h3 {
      margin-top: 20px;
    }
  }
`;

export const ContentChart = styled.div`
  display: flex;
  justify-content: center;

  font-size: 1rem;
`;

export const ContainerInfos = styled.div`
  display: flex;
  justify-content: center;

  div {
    margin: 10px;
    display: flex;
    align-items: center;

    svg {
      width: 100%;
    }
  }
`;

export const Circles = styled.div<iContribuition>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(props) => props.color};
`;

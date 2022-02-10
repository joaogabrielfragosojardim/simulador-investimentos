import styled from "styled-components";
import { IDataDashboard } from "../pages/Home";
import { theme } from "../styles/theme";

import { BarChart, Bar, XAxis } from "recharts";

interface iProps {
  dataDashboard: IDataDashboard;
}

interface iCards {
  green?: boolean;
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

  console.log("data =>", data);

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
      <BarChart
        width={900}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="month" />
        <Bar
          dataKey="withoutContribuiton"
          stackId="money"
          fill={theme.colors.black}
        />
        <Bar
          dataKey="contribuition"
          stackId="money"
          fill={theme.colors.principal}
        />
      </BarChart>
    </>
  );
};

export const ContainerCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 50px 80px;
`;

export const Cards = styled.div<iCards>`
  text-align: center;
  padding: 5px 25px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.2);

  h4 {
    margin-top: 30px;
    font-weight: ${(props) => (props.green ? "bold" : 300)};
    color: ${(props) => (props.green ? "green" : theme.colors.black)};
    font-size: 1.2rem;
  }
`;

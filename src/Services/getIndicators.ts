import { api } from "./api";

export const getIndicators = async () => {
  const { data } = await api.get("/indicadores");

  const formatedValues = {
    CDI: data?.[0]?.valor,
    IPCA: data?.[1]?.valor,
  };

  return formatedValues;
};

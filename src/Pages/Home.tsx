import { Form } from "../Components/Form";
import { Title } from "../Components/Title";
import { SubTitle } from "../Components/SubTitle";

import { useState, useEffect } from "react";
import { api } from "../Services/api";

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
      <SubTitle />
      <Form
        initialValuesForm={initialValuesForm}
        valuesForm={valuesForm}
        setValuesForm={setValuesForm}
      />
    </>
  );
};

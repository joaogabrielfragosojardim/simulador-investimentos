export const toRealMoney = (money: number | undefined) => {
  return money?.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};

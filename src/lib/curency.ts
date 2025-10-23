import { MyBig } from "./big";

export const toCent = (amount: number) => {
  return MyBig(amount).mul(100).round(0).toNumber();
};

export const fromCent = (amount: number) => {
  return MyBig(amount).div(100).round(0).toNumber();
};

export const toCurrencyFormCent = (amount: number) => {
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(fromCent(amount));
};
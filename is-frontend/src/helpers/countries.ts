import { findCountry as searchCountry } from "../api/countries";
import { throttle } from "./throttle";

export const findCountry = async (value: string) => {
  if (value.length > 0) {
    const newCountries = (await searchCountry(value)).map((country: { name: any; }) => {
      return { value: country.name, label: country.name }
    });

    return newCountries;
  }

  return [];
};
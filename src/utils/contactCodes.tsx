import { Country } from "country-state-city";

const countries = Country.getAllCountries();

export const contactCodesOptions = countries.map((country) => {
  return {
    label: 
    <div className="flex gap-2">
      <img src={`https://flagsapi.com/${country.isoCode}/flat/64.png`} width={20}  height={20}/> 
      <span>
        {country.phonecode.includes("+") ? country.phonecode : `+${country.phonecode}`}
      </span>
    </div>,
    value: country.phonecode,
  };
});

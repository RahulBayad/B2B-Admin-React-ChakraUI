import { Country, type ICountry } from "country-state-city";

export const getContactCodesOptions = (countries: ICountry[]) => {
  console.log("called get contact")
   return countries.map((country, idx) => ({
      label: 
      <div key={"key"+idx} className="flex gap-2">
        <img src={`https://flagsapi.com/${country.isoCode}/flat/64.png`} width={20} className="max-h-5 "/> 
        <span>
          {country.isoCode} &nbsp;  
          {country.phonecode.includes("+") ? `(${country.phonecode} )` : ` (+${country.phonecode})`}
        </span>
      </div>,
      value: country.isoCode+ " - " + country.phonecode,
    }
  ));
}

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Country {
  isoCode: string;
  name: { languageCode: string; text: string }[];
}

interface Props {
  selectedCountry: string;
  onChange: (value: string) => void;
}

function CountrySelector({ selectedCountry, onChange }: Props) {
  const { data, error } = useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await axios.get("https://openholidaysapi.org/Countries", {
        params: {
          languageIsoCode: "EN",
        },
      });
      return res.data;
    },
  });

  if (error) return <div>Error loading countries;-;</div>;

  const selectedCountryName =
    data
      ?.find((country) => country.isoCode === selectedCountry)
      ?.name.find((n) => n.languageCode === "en")?.text || "Select a country";

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {selectedCountryName}
      </button>
      <ul className="dropdown-menu">
        {data?.map((country) => {
          const englishName = country.name.find((n) => n.languageCode === "en");
          return (
            <li key={country.isoCode}>
              <button
                className="dropdown-item"
                onClick={() => onChange(country.isoCode)}
              >
                {englishName?.text || country.name[0]?.text || "Unnamed"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CountrySelector;

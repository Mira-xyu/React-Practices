import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { closestIndexTo } from "date-fns";

interface Props {
  countryCode: string;
}

type Holiday = {
  name: {
    language: string;
    text: string;
  }[];
  startDate: string;
  endDate: string;
};

let countryCode = "NL";

function HolidayList({ countryCode }: Props) {
  const { data, isLoading, error } = useQuery<Holiday[]>({
    //'data,isLoading,error'are the properties we're fetching
    queryKey: ["holidays", countryCode],
    queryFn: async () => {
      const res = await axios.get(
        "https://openholidaysapi.org/PublicHolidays",
        {
          params: {
            //parameters
            countryIsoCode: countryCode,
            validFrom: "2025-01-01",
            validTo: "2025-12-31",
            languageIsoCode: "en",
          },
        }
      );
      return res.data; //take the response and return only the data part
    },
    enabled: !!countryCode, //only fetch the data when a countryCode is selected
  }); //!!->gives a true(has content) or false(empty string) value

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>An error has occured;-;</p>;

  //console.log("Fetched data:", data);

  return (
    <>
      <ul className="list-group">
        {data?.map((holiday, index) => {
          const englishName = holiday.name.find((n) => n.language === "en");

          return (
            <li key={index} className="list-group-item">
              <div className="d-flex w-100 justify-content-between">
                <div className="mb-2">
                  <h4 className="mb-1">
                    Holiday:
                    {englishName?.text ||
                      holiday.name[0]?.text ||
                      "Unnamed Holiday"}
                  </h4>
                  <p> </p>
                  <p>Start date:{holiday.startDate}</p>
                  <p>End date:{holiday.endDate}</p>
                </div>
                <small>{countryCode}</small>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
export default HolidayList;

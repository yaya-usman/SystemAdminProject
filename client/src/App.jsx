import axios from "axios";
import { useQuery } from "react-query";

function App() {
  const { data } = useQuery(
    "uniqueKey",
    async () => await axios.get("/api/ipRecords")
  );

  return (
    <div className="relative overflow-x-auto w-[100%] mt-4 ">
      <div className="text-center m-auto my-8 text-xl text-[#42aee0] 	">
        <p>Your IP Address: {data?.data[data.data.length - 1].ipAddress}</p>
      </div>
      <table className="w-[800px] m-auto text-sm text-center">
        <thead className="text-xs text-[#f0eded] capitalize bg-gray-700 ">
          <tr>
            <th scope="col" className="px-6 py-5">
              #
            </th>
            <th scope="col" className="px-6 py-5">
              Datetime
            </th>
            <th scope="col" className="px-6 py-5">
              IP Address
            </th>
            <th scope="col" className="px-6 py-5">
              City
            </th>
            <th scope="col" className="px-6 py-5">
              Country
            </th>
            <th scope="col" className="px-6 py-5">
              Flag
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((item, i) => {
            return (
              <tr className="bg-white border-b  " key={i}>
                <td className="px-6 py-4">{i + 1}</td>
                <td className="px-6 py-4">{item.timeCreated}</td>
                <td className="px-6 py-4">
                  {item.ipAddress}
                </td>
                <td className="px-6 py-4">{item.city}</td>
                <td className="px-6 py-4">{item.country}</td>
                <td className="px-6 py-4">
                  <img
                    src={item.flag}
                    className="object-contain h-[20px] w-full"
                    alt="flag"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;

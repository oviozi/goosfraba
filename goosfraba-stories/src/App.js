import { useQuery } from "@apollo/client";
import BarGraph from "./Components/BarGraph";
import { GET_2019_DATA } from "./gql/Queries";

const getDataForYear = (allPosts) =>
  allPosts.filter((item) => {
    const date = new Date(Number(item.createdAt));
    const year = date.getFullYear();
    return year === 2019;
  });

function App() {
  const { error, loading, data } = useQuery(GET_2019_DATA);
  if (error) return <p>Error...</p>;
  if (loading) return <p>Loading...</p>;

  const filteredList = getDataForYear(data.allPosts);
  return <BarGraph width={800} height={800} yearList={filteredList} />;
}

export default App;

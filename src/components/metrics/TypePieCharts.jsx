import { PieChart } from "@mui/x-charts";

export const TypePieChart = ({ books = 0, songs = 0, movies = 0, ...rest }) => {
  return (
    <PieChart
      series={[
        {
          arcLabel: (item) => item.label,
          data: [
            {
              id: 0,
              value: books,
              label: "books",
              color: "red",
            },
            {
              id: 1,
              value: songs,
              label: "songs",
              color: "green",
            },
            {
              id: 2,
              value: movies,
              label: "movies",
              color: "blue",
            },
          ],
        },
      ]}
      height={450}
      width={450}
      {...rest}
    />
  );
};

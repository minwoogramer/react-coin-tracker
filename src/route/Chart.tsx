import { useCoinDetailOutletContext } from "./Detail";
import { useQuery } from "react-query";
import { fetchCoinCandles } from "../query/coin-api";
import { Loader } from "../styled/Loader";
import ReactApexChart from "react-apexcharts";

function Chart() {
  const { symbol } = useCoinDetailOutletContext();
  const { data: coinCandles, isLoading: isLoadingCoinCandles } = useQuery(["fetchCoinCandles", symbol], () => fetchCoinCandles(symbol));

  return (
    <>
      {isLoadingCoinCandles ? (
        <Loader>
          Loading...
        </Loader>
      ) : (
        coinCandles ? (
          <ReactApexChart
            type="candlestick"
            series={[
              {
                name: "Price",
                data: coinCandles.map(coinCandle => (
                  {
                    x: coinCandle.candle_date_time_kst,
                    y: [coinCandle.opening_price, coinCandle.high_price, coinCandle.low_price, coinCandle.trade_price],
                  }
                )),
              }
            ]}
            options={{
              theme: {
                mode: "dark",
              },
              plotOptions: {
                candlestick: {
                  colors: {
                    upward: "#c0392b",
                    downward: "#2980b9",
                  },
                },
              },
              xaxis: {
                type: "datetime",
                labels: {
                  show: false,
                },
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
              },
              yaxis: {
                tickAmount: 8,
                labels: {
                  formatter: (val) => `￦${val.toLocaleString()}`,
                },
              },
              tooltip: {
                x: {
                  formatter: (val) => (new Date(val)).toLocaleDateString(),
                },
              }
            }}
          />
        ) : "Not Available"
      )}
    </>
  );
}

export default Chart;

import { useCoinDetailOutletContext } from "./Detail";
import { useQuery } from "react-query";
import { fetchCoinTicker } from "../query/coin-api";
import { Loader } from "../styled/Loader";
import styled from "styled-components";

const CoinPriceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  font-weight: bold;
  
  &:first-child {
    margin-top: 0;
  }
  
  & > div {
    flex: 1;
    text-align: right;
  }
  
  & > div:first-child {
    color: ${(props) => props.theme.accentColor};
    font-weight: normal;
  }
`;

function Price() {
  const { symbol } = useCoinDetailOutletContext();
  const { data: coinTicker, isLoading: isLoadingCoinTicker } = useQuery(["fetchCoinTicker", symbol], () => fetchCoinTicker(symbol), {
    refetchInterval: 1000,
  });

  let priceColor = "";
  let priceDiffUnit = "+";

  if (Number(coinTicker?.signed_change_price) > Number.EPSILON) {
    priceColor = "#c0392b";
  } else if (Number(coinTicker?.signed_change_price) < 0) {
    priceColor = "#2980b9";
    priceDiffUnit = "";
  }

  return (
    <>
      {isLoadingCoinTicker ? (
        <Loader>
          Loading...
        </Loader>
      ) : (
        coinTicker ? (
          <div>
            <CoinPriceItem>
              <div>현재가</div>
              <div style={{color: priceColor || undefined}}>
                ￦{coinTicker.trade_price.toLocaleString()}
              </div>
            </CoinPriceItem>
            <hr/>
            <CoinPriceItem>
              <div>전일대비</div>
              <div style={{color: priceColor || undefined}}>
                {priceDiffUnit}{(coinTicker.signed_change_rate * 100).toFixed(2)}%
                {" "}
                ({priceDiffUnit}{coinTicker.signed_change_price.toLocaleString()})
              </div>
            </CoinPriceItem>
            <hr/>
            <CoinPriceItem>
              <div>시가</div>
              <div>￦{coinTicker.opening_price.toLocaleString()}</div>
            </CoinPriceItem>
            <hr/>
            <CoinPriceItem>
              <div>고가</div>
              <div>￦{coinTicker.high_price.toLocaleString()}</div>
            </CoinPriceItem>
            <hr/>
            <CoinPriceItem>
              <div>저가</div>
              <div>￦{coinTicker.low_price.toLocaleString()}</div>
            </CoinPriceItem>
            <hr/>
            <CoinPriceItem>
              <div>거래대금</div>
              <div>￦{Math.round(coinTicker.acc_trade_price_24h).toLocaleString()}</div>
            </CoinPriceItem>
            <hr/>
          </div>
        ) : "Not Available"
      )}
    </>
  );
}

export default Price;

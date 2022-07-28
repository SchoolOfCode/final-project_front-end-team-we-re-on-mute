import React, { useEffect, useState } from 'react';
import {Chart, data} from "./Chart"

function Exchange() {

  const [url, setUrl] = useState(``)
  const [historical, setHistorical] = useState("")
  const [to, setTo] = useState("")
  const [from, setFrom] = useState("")
  const [amount, setAmount] = useState("")
  const [rate, setRate] = useState("")
  const [result, setResult] = useState("")
  
  //needed to send through API fetch, will not accept apikey without this
  const myHeaders = new Headers();
  myHeaders.append("apikey", "YvAG8rpVVJsK2lU4u4TQ4XsG2pZJFxJu");
  
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

  useEffect(() => {
    async function getRates() {
      // const response = await fetch(url, requestOptions)
      // const response2 = await fetch(historical, requestOptions)

      // let data = await response.json()
      // let data2 = await response2.json()
  
      let data2 = {
                    "success": true,
                    "timeseries": true,
                    "start_date": "2022-07-20",
                    "end_date": "2022-07-27",
                    "base": "USD",
                    "rates": {
                        "2022-07-20": {
                            "GBP": 0.83535
                        },
                        "2022-07-21": {
                            "GBP": 0.83365
                        },
                        "2022-07-22": {
                            "GBP": 0.833021
                        },
                        "2022-07-23": {
                            "GBP": 0.833021
                        },
                        "2022-07-24": {
                            "GBP": 0.834304
                        },
                        "2022-07-25": {
                            "GBP": 0.82957
                        },
                        "2022-07-26": {
                            "GBP": 0.830825
                        },
                        "2022-07-27": {
                            "GBP": 0.822205
                        }
                    }
                }
         
      const x = data2.rates
      const arr = Object.keys(x).map(function(key, index) {
        return x;
      })

      console.log(arr)
      
      // console.log(Object.keys(x))

      console.log(x["2022-07-20"][to])

      // const arr = []

       

      //  for (var key in data2) {
      //      if (data2.hasOwnProperty(key)) {
      //          arr.push(data2[key]);
      //      }
      //  }
       
      //  console.log(arr);
      //  console.log(arr[5]);


      // console.log(data2.rates["2022-07-20"])
      // setResult(data.result)
      // setRate(data.info.rate)
    }
    getRates()
  }, [url])


//gets today's date minus 24 hours, so YESTERDAY's date, as UNIX timestamp
const yesterday = Date.now() - 86400000;
//gets the date 8 days previous (using same method of subtracting from the UNIX timestamp)
const eightDays = Date.now() - 691200000;

// console.log(yesterday)


let unix_timestamp = yesterday

//converts UNIX timestamp to JS date/timestamp
const date = new Date(unix_timestamp);

//extrapolates year
const year = date.getFullYear();
//extrapolates month and turns into double-digit readout so 07 rather than 7 for eg. This required for API fetch parameters
const month = (('0' + (date.getMonth()+1)).slice(-2));
//extrapolates date and likewise gives double-digit readout
const day = ('0' + date.getDate()).slice(-2);

const formattedTime = `${year}-${month}-${day}`;

// console.log(formattedTime)

//code repeated to get the second date required for API fetch for historical rates
let unix_timestamp2 = eightDays

const date2 = new Date(unix_timestamp2);

const year2 = date2.getFullYear();
const month2 = (('0' + (date2.getMonth()+1)).slice(-2));
const day2 = ('0' + date2.getDate()).slice(-2);

const formattedTime2 = `${year2}-${month2}-${day2}`;

// console.log(formattedTime2)



  function handleClick() {
    setUrl(`https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${amount}`)
    setHistorical(`https://api.apilayer.com/fixer/timeseries?start_date=${formattedTime2}&end_date=${formattedTime}&base=${from}&symbols=${to}`)
  }

  console.log()

  return (
    <>
      <h2>Exchange Rate Checker</h2>
      <div>
        <label htmlFor="Amount">Amount</label>
        <input id="Amount" onChange={(e) => {setAmount(e.target.value)}}></input>
      </div>
      <div>
        <label htmlFor="From">From</label>
        <input id="From" onChange={(e) => {setFrom(e.target.value)}}></input>
        <label htmlFor="To">To</label>
        <input id="To" onChange={(e) => {setTo(e.target.value)}}></input>
        <label htmlFor="Rate">Rate</label>
        <input id="Rate" value={rate}></input>
      </div>
      <h3>{result}</h3>
      <button onClick={handleClick}>Get Rate</button>
      <h4>The last 7 days trend</h4>
      <Chart/>
    </>
  )
}

export default Exchange;

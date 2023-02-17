export default async function apiPutDailySale(data) {
    console.log(JSON.stringify(data))
    return await fetch("https://zany-gold-gopher-hat.cyclic.app/DailySale/", {
      method: "PUT",
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Headers' : "*"
      },
      mode: "cors",
      body: JSON.stringify(data)
    })
      .then((response) => console.log(response.json()))
      .catch((error) => console.log(error));
  }
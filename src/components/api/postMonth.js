export default async function postMonth(data) {
    return await fetch("https://zany-gold-gopher-hat.cyclic.app/NewMonth/", {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Headers' : "*"
      },
      mode: "cors",
      body: JSON.stringify(data)
    })
      .then((response) => response.text())
      .then((text) => alert(text))
      .catch((error) => alert(error));
  }
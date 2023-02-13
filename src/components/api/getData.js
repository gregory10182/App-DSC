export default async function apiGetData(id) {
  return await fetch("https://zany-gold-gopher-hat.cyclic.app/Month/" + id, {
    method: "GET"
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

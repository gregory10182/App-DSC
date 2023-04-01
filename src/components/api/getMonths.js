// export default async function apiGetMonths() {
//   return await fetch("https://zany-gold-gopher-hat.cyclic.app/", {
//     method: "GET"
//   })
//     .then((response) => response.json())
//     .catch((error) => console.log(error));
// }


export default async function apiGetMonths() {
  return await fetch("https://zany-gold-gopher-hat.cyclic.app/", {
    method: "GET"
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error));
}

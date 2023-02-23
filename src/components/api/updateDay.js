export default async function updateDay(id) {
    return await fetch("https://zany-gold-gopher-hat.cyclic.app/UpdateDay/" + id, {
      method: "PUT",
    })
      .then((response) => console.log(response.json()))
      .catch((error) => console.log(error));
  }
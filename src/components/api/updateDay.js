export default async function updateDay(id) {
    return await fetch("https://zany-gold-gopher-hat.cyclic.app/UpdateDay/" + id, {
      method: "PUT",
    })
      .then((response) => response)
      .catch((error) => console.log(error));
  }
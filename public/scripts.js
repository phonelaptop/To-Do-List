const createList = (result) => {
  let template = "";

  result.forEach((datum, i) => {
    console.log("HIIIII", datum);
    template += `
          <tr class="tabler">
            <td>${datum.name}</td>
            <td>${datum.description}</td>
            <td>${datum.date}</td>
            <td id="tag-${i}-delete"><img class="imaage" src="https://www.svgrepo.com/download/21045/delete-button.svg"/></td>
            <td id="tag-${i}-edit"><img class="image" src="https://cdn-icons-png.flaticon.com/512/469/469569.png"/></td>
          </tr>
        `;
  });

  document.querySelector("#container").innerHTML = template;

  for (let i = 0; i < result.length; i++) {  
    console.log(result, i)
    document.querySelector(`#tag-${i}-delete`).addEventListener("click", async () => {
      const response = await fetch(`todolist/${i}`, {method: "DELETE"});
      const data = await response.json();

      createList(data);
    });
  }
};

const getListData = async () => {
  const response = await fetch("/todolist");
  const data = await response.json();

  createList(data);
}

getListData();

document.querySelector("#guess").addEventListener("click", function () {
  const assignment = document.querySelector("#assignment").value.trim();
  const date = document.querySelector("#date").value.trim();
  const description = document.querySelector("#description").value.trim();

  if (assignment === "" || date === "" || description === "") {
    console.log("condition met")
    return;
  }
  console.log("not met")

  const obj = {
    name: assignment,
    date: date,
    description: description,
  };

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  fetch("/todolist", {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(obj),
  })
    .then((response) => response.json())
    .then((result) => {
      createList(result);
    });
});

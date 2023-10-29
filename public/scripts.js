document.querySelector("#guess").addEventListener("click", function () {
  const assignment = document.querySelector("#assignment").value;
  const date = document.querySelector("#date").value;
  const obj = {
    name: assignment,
    date: date,
  };

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(obj),
  };

  fetch("/todolist", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      let template = "";

      result.forEach((datum, i) => {
        console.log("HIIIII", datum);
        template += `
          <tr>
            <td>${datum.name}</td>
            <td>${datum.date}</td>
            <td id="tag-${i}"><img class="imaage" src="https://www.svgrepo.com/download/21045/delete-button.svg"/></td>
          </tr>
        `;
      });

      document.querySelector("#container").innerHTML = `
        <table class="table">
          <tbody>
            ${template}
          </tbody>
        </table>
      `;

      // result.forEach((datum, i) => {
      //   document
      //     .querySelector(`#tag-${i}`)
      //     .addEventListener("click", function () {
      //       const requestOptions = {
      //         method: "DELETE",
      //       };

      //       document.querySelector("#container").innerHTML = "";

      //       fetch("/todolist/" + i, requestOptions)
      //         .then((response) => response.json())
      //         .then((result) => {
      //           console.log("result", result);
      //           result.forEach((datum, i) => {
      //             template += `
      //               <tr>
      //                 <td>${datum.name}</td>
      //                 <td>${datum.date}</td>
      //                 <td id="tag-${i}"><img class="imaage" src="https://www.svgrepo.com/download/21045/delete-button.svg"/></td>
      //               </tr>
      //             `;
      //           });

      //           document.querySelector("#container").innerHTML = `
      //             <table class="table">
      //               <tbody>
      //                 ${template}
      //               </tbody>
      //             </table>
      //           `;
      //         });
      //     });
      // });
    });
});

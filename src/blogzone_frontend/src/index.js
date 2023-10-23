import { blogzone_backend } from "../../declarations/blogzone_backend";

ClassicEditor.create(document.querySelector(".editor"), {
  placeholder: "Type the content here!",
  toolbar: {
    items: [
      "bold",
      "italic",
      "numberedList",
      "|",
      "strikethrough",
      "specialCharacters",
      "SelectAll",
      "|",
      "undo",
      "redo",
    ],
  },
  language: "en",
  licenseKey: "",
})
  .then((editor) => {
    window.editor = editor;
  })
  .catch((error) => {
    console.error("Oops, something went wrong!");
    console.error(
      "Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:"
    );
    console.warn("Build id: pmx4yvdjalhf-y97dsflr6i51");
    console.error(error);
  });

const totalPosts = await blogzone_backend.getPosts();

const container = document.getElementById("card-container");
function formatNanosecondsTimestamp(nanosecondsTimestamp) {
  // Convert nanoseconds to milliseconds (1 second = 1,000,000,000 nanoseconds)
  const millisecondsTimestamp = Number(nanosecondsTimestamp) / 1000000;

  // Create a Date object using the milliseconds timestamp
  const date = new Date(millisecondsTimestamp);

  // Format the date as a human-readable string
  const formattedDate = date.toLocaleString(); // Adjust the locale as needed

  return formattedDate;
}

const color_array = ["blue", "green", "yellow", "brown", "purple", "orange"];

// Use the map function to create an array of card elements
const cardElements = totalPosts.map((postObj, key) => {
  return `
    <div class="col-md-6 col-sm-6 content-card" key=${key}>
        <div class="card-big-shadow">
            <div class="card card-just-text" data-backgrou nd="color" data-color=${
              color_array[key]
            } data-radius="none">
                <div class="content">
                    <h6 class="category">${formatNanosecondsTimestamp(
                      postObj.time
                    )}</h6>
                    <h4 class="title"><a href="#">${postObj.title}</a></h4>
                    <p class="description">${postObj.post}</p>
                </div>
            </div>
        </div>
    </div>
  `;
});

// Join the card elements and insert them into the container
container.innerHTML = cardElements.join("");

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = e.target.querySelector("button");
  const editorData = editor.getData();
  const title = document.getElementById("title").value.toString();
  button.setAttribute("disabled", true);
  // Interact with foo actor, calling the greet method
  const postAdded = await blogzone_backend.add(title, editorData);
  button.removeAttribute("disabled");
  alert("data addeed successfully");
  window.location.reload();
  return false;
});

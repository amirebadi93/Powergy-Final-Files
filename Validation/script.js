document.body.classList.add("loading");

window.addEventListener("load", function() {
  const minDisplayTime = 2000; // 2 seconds
  const startTime = new Date().getTime();

  function hideLoader() {
    document.getElementById("loader").style.display = "none";
    document.body.classList.remove("loading");
  }

  const elapsedTime = new Date().getTime() - startTime;

  if (elapsedTime < minDisplayTime) {
    setTimeout(hideLoader, minDisplayTime - elapsedTime);
  } else {
    hideLoader();
  }
});

document.getElementById("add-btn").addEventListener("click", function() {
  const todoInput = document.getElementById("todo-input");
  const todoText = todoInput.value.trim(); // Use trim() to remove whitespace

  if (todoText !== "") {
    const todoList = document.getElementById("todo-list"); // Clear previous results

    todoList.innerHTML = "";

    const listItem = document.createElement("li");
    listItem.className = "todo-item";

    // Add a temporary loading message while checking
    listItem.innerHTML = "<span>Checking validity...</span>";
    todoList.appendChild(listItem); // Check if PDF exists dynamically

    checkPDFExists(todoText, listItem);
    todoInput.value = "";
  }
});

/**
 * Dynamically checks if a PDF exists on the server using a HEAD request.
 * @param {string} serialNumber The serial number input by the user.
 * @param {HTMLElement} listItem The list item element to update with the result.
 */
function checkPDFExists(serialNumber, listItem) {
  // Define the path based on the input serial number
  const pdfPath = `./Styles/pdf/${serialNumber}.pdf`;

  // Use fetch with the HEAD method to check existence without downloading the file
  fetch(pdfPath, { method: "HEAD" })
    .then(response => {
      if (response.ok) {
        // PDF exists (Server returned 200-299 status)
        listItem.innerHTML = `<div class="valid">
  <h1 style="color: green; font-weight: bold;">Valid</h1><br><br>
 <button onclick="downloadPDF('${pdfPath}', '${serialNumber}')" 
 style="background-color: #007bff; color: white; padding: 10px 20px; 
 border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
 Download PDF for Serial: ${serialNumber}
 </button>
</div>`;
      } else {
        // PDF doesn't exist (e.g., Server returned 404 Not Found)
        listItem.innerHTML = `
 <span style="color: red; font-weight: bold;">Not Valid (Serial: ${serialNumber})</span>
 `;
      }
    })
    .catch(error => {
      // Handle network errors (e.g., server is down, CORS issues)
      console.error("Error checking PDF existence:", error);
      listItem.innerHTML = `
<span style="color: orange; font-weight: bold;">Error during validation check.</span>
 `;
    });
}

// Function to download PDF
function downloadPDF(pdfPath, serialNumber) {
  const link = document.createElement("a");
  link.href = pdfPath;
  link.download = `Serial_${serialNumber}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Note: The removeTodoItem function was unused in the new validation display logic,
// but kept here if needed elsewhere.
function removeTodoItem(button) {
  const listItem = button.parentElement;
  listItem.remove();
}

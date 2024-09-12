let notes = [];

document.addEventListener("DOMContentLoaded", () => {
  updateNotesTable();
});

function updateNotesTable(new_edit, noteId) {
  notes = JSON.parse(localStorage.getItem("notes"));

  let table = document.getElementById("notes-table");
  let rowCount = table.rows.length;
  while (--rowCount) {
    table.deleteRow(rowCount);
  }

  if (notes) {
    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];

      let row = table.insertRow(-1);
      let idAttribute = document.createAttribute("id");

      idAttribute.value = i;
      row.setAttributeNode(idAttribute);

      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      cell1.innerHTML = note["title"];
      cell2.innerHTML = note["content"];
      cell3.innerHTML = `<a id="openEditModalBtn${i}" href="#"><img src="images/edit.png" style="width: 22px;"></a>
                                     <a id="confirmDeleteNoteBtn${i}" href="#"><img src="images/delete.png" style="width: 22px;"></a>`;

      cell3.setAttribute("id", `editDelete`);
      let openEditModalBtn = document.getElementById(`openEditModalBtn${i}`);
      let confirmDeleteNoteBtn = document.getElementById(
        `confirmDeleteNoteBtn${i}`
      );

      openEditModalBtn.addEventListener("click", () => {
        openEditModal(i);
      });
      confirmDeleteNoteBtn.addEventListener("click", () => {
        confirmDeleteNote(i);
      });
    }
  }

  if (new_edit) {
    console.log(noteId);
    console.log(document.getElementById(noteId));
    document
      .getElementById(noteId)
      .setAttribute("style", "animation: new-row 2.5s;");
  }
}

const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", () => {
  openAddModal();
});

function openAddModal() {
  let modal = document.getElementById("addNoteModal");
  let closeSpan = document.getElementById("closeAdd");
  let cancelButton = document.getElementById("cancelAddNoteBtn");

  clearAddModal();

  modal.style.display = "block";

  closeSpan.onclick = () => {
    modal.style.display = "none";
  };

  cancelButton.onclick = () => {
    modal.style.display = "none";
  };
}

const saveAddNoteBtn = document.getElementById("saveAddNoteBtn");

saveAddNoteBtn.addEventListener("click", () => {
  const titleStr = document.getElementById("addTitle").value;
  const contentStr = document.getElementById("addContent").value;

  if (!titleStr || !contentStr) {
    document.getElementById("addError").innerHTML =
      "Please fill out both fields";
  } else {
    const noteData = { title: titleStr, content: contentStr };

    if (!notes) {
      notes = [];
    }
    notes.push(noteData);

    localStorage.setItem("notes", JSON.stringify(notes));
    clearAddModal();
    updateNotesTable(true, notes.length - 1);
  }
});

function clearAddModal() {
  document.getElementById("addTitle").value = "";
  document.getElementById("addContent").value = "";
  document.getElementById("addError").innerHTML = "";
}

function openEditModal(noteId) {
  let modal = document.getElementById("editNoteModal");
  let closeSpan = document.getElementById("closeEdit");
  let cancelButton = document.getElementById("cancelEditNoteBtn");

  clearEditModal();

  modal.style.display = "block";

  closeSpan.onclick = () => {
    modal.style.display = "none";
  };

  cancelButton.onclick = () => {
    modal.style.display = "none";
  };

  loadNoteData(noteId);
}

function loadNoteData(noteId) {
  let modal = document.getElementById("editNoteModal");
  let noteIdAttribute = document.createAttribute("noteid");
  noteIdAttribute.value = noteId;
  modal.setAttributeNode(noteIdAttribute);

  document.getElementById("editTitle").value = notes[noteId].title;
  document.getElementById("editContent").value = notes[noteId].content;
}

const saveEditNoteBtn = document.getElementById("saveEditNoteBtn");
saveEditNoteBtn.addEventListener("click", saveEditNote);

function saveEditNote() {
  let modal = document.getElementById("editNoteModal");
  const noteId = modal.getAttribute("noteid");
  const titleStr = document.getElementById("editTitle").value;
  const contentStr = document.getElementById("editContent").value;

  if (!titleStr || !contentStr) {
    document.getElementById("editError").innerHTML =
      "Please fill out both fields";
  } else {
    notes[noteId].title = titleStr;
    notes[noteId].content = contentStr;

    localStorage.setItem("notes", JSON.stringify(notes));
    document.getElementById("editError").innerHTML = "";
    updateNotesTable(true, noteId);
  }
}

function clearEditModal() {
  document.getElementById("editTitle").value = "";
  document.getElementById("editContent").value = "";
  document.getElementById("editError").innerHTML = "";
}

function confirmDeleteNote(noteId) {
  let action = confirm("Are you sure you want to delete this note?");
  if (action == true) {
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    updateNotesTable();
  }
}

const clear_btn = document.getElementById("clearBtn");

clear_btn.addEventListener("click", () => {
  let action = confirm("Are you sure you want to clear all notes?");
  if (action == true) {
    localStorage.clear();
    updateNotesTable();
  }
});


const addTitle = document.getElementById('addTitle');
const addText = document.getElementById('addText');
const addNoteButton = document.getElementById('addNote');
const notesDiv = document.getElementById('notes');
const deleteNoteButton = document.getElementById('deleteNote');
const searchNote = document.getElementById('searchNotes');
const archiveDiv = document.getElementById('archive');
const NotesSection = document.querySelector("#notes-btn");
const archiveSection = document.querySelector("#archive-btn");
const inputboxDiv = document.querySelector("#input-box");
const trashNoteSection = document.querySelector("#trash-btn");
const trashDiv = document.querySelector("#trashNotes");


//navigation
window.addEventListener("load", () => {
    showNotes();
    notesDiv.style.display = "flex";
    inputboxDiv.style.display = "block";
    archiveDiv.style.display = "none";
    trashDiv.style.display = "none";
})
NotesSection.addEventListener("click", () => {
    showNotes();
    notesDiv.style.display = "flex";
    inputboxDiv.style.display = "block";
    archiveDiv.style.display = "none";
    trashDiv.style.display = "none";

})

archiveSection.addEventListener("click", () => {
    showArchiveNotes();
    notesDiv.style.display = "none";
    inputboxDiv.style.display = "none";
    archiveDiv.style.display = "flex";
    trashDiv.style.display = "none";
})

trashNoteSection.addEventListener("click", () => {
    showTrashNotes();
    notesDiv.style.display = "none";
    inputboxDiv.style.display = "none";
    archiveDiv.style.display = "none";
    trashDiv.style.display = "flex";
})

addNoteButton.addEventListener('click', addNotes);

function addNotes(){
    let notes = localStorage.getItem('notes');
    if(notes === null){
        notes = [];
    }else{
        notes = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addText.value
    }
    notes.push(myObj);
    localStorage.setItem('notes', JSON.stringify(notes));
    addTitle.value = '';
    addText.value = '';
    showNotes();
}


function showNotes(){
    let notesHTML = '';
    let notes = localStorage.getItem('notes');
    if(notes === null){
        return;
    }else{
        notes = JSON.parse(notes);
    }
    for(let i=0; i<notes.length; i++){
        notesHTML += `<div class="note">
                       <span class="title">${notes[i].title === "" ? 'Note' : notes[i].title}<button class="editNote" id=${i} onclick="editNotes(${i})"><span class="material-symbols-outlined">
                       edit
                       </span></button></span>
                       <hr>
                       <div class="text">${notes[i].text}</div>
                       <button class="deleteNote" id=${i} onclick="deleteNote(${i})"> <span class="material-symbols-outlined">
                       delete
                     </span></button>
                       <button class="archiveNote" id=${i} onclick="archiveNote(${i})">Archive</button>
                </div>`
    }
    notesDiv.innerHTML = notesHTML;
}

function editNotes(ind){
    let notes = localStorage.getItem('notes');
    if(notes === null){
        return;
    }else{
        notes = JSON.parse(notes);
    }
    addTitle.value = notes[ind].title;
    addText.value = notes[ind].text;
    notes.splice(ind, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
}

function deleteNote(ind){
    let notes = localStorage.getItem('notes');
    let trashNotes = localStorage.getItem('trashNotes');
    if(notes === null){
        return;
    }else{
        notes = JSON.parse(notes);
    }
    if(trashNotes === null){
        trashNotes = [];
    }else{
        trashNotes = JSON.parse(trashNotes);
    }
    trashNotes.push(notes[ind]);
    localStorage.setItem('trashNotes', JSON.stringify(trashNotes));
    notes.splice(ind, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();

}
function showTrashNotes(){
    let trashNotesHTML = '';
    let trashNotes = localStorage.getItem('trashNotes');
    if(trashNotes === null){
        return;
    }else{
        trashNotes = JSON.parse(trashNotes);
    }
    for(let i=0; i<trashNotes.length; i++){
        trashNotesHTML += `<div class="note">
                        <span class="title">${trashNotes[i].title === "" ? 'Note' : trashNotes[i].title}</span>
                        <hr>
                        <div class="text">${trashNotes[i].text}</div>
                        <button class="deleteNote" id=${i} onclick="deleteTrashNotes(${i})"> <span class="material-symbols-outlined">
                        delete
                      </span></button>
                        <button class="archiveNote" id=${i} onclick="archiveTrashNotes(${i})">Archive</button>
                        <button class="restoreNote" id=${i} onclick="restoreTrashNotes(${i})">Restore</button>
                </div>`
    }
    trashDiv.innerHTML = trashNotesHTML;
}
function deleteTrashNotes(ind){

    let trashNotes = localStorage.getItem('trashNotes');
    if(trashNotes === null){
        return;
    }else{
        trashNotes = JSON.parse(trashNotes);
    }
    trashNotes.splice(ind, 1);
    localStorage.setItem('trashNotes', JSON.stringify(trashNotes));
    showTrashNotes();

}
function archiveTrashNotes(ind){
    let trashNotes = localStorage.getItem('trashNotes');
    let Notes = localStorage.getItem('Notes');
    if(trashNotes === null){

        return;
    }else{

        trashNotes = JSON.parse(trashNotes);
    }
    if(archiveNotes === null){
        archiveNotes = [];
    }else{
        archiveNotes = JSON.parse(archiveNotes);
    }
    archiveNotes.push(trashNotes[ind]);
    localStorage.setItem('archiveNotes', JSON.stringify(archiveNotes));
    trashNotes.splice(ind, 1);
    localStorage.setItem('trashNotes', JSON.stringify(trashNotes));
    showTrashNotes();
    showArchiveNotes();
}
function restoreTrashNotes(ind){
    let trashNotes = localStorage.getItem('trashNotes');
    let notes = localStorage.getItem('notes');
    if(trashNotes === null){

        return;
    }else{

        trashNotes = JSON.parse(trashNotes);
    }
    if(notes === null){
        notes = [];
    }else{

        notes = JSON.parse(notes);
    }
    notes.push(trashNotes[ind]);
    localStorage.setItem('notes', JSON.stringify(notes));
    trashNotes.splice(ind, 1);
    localStorage.setItem('trashNotes', JSON.stringify(trashNotes));
    showTrashNotes();
    showNotes();
}
searchNote.addEventListener('input', searchNotes);
function searchNotes(){
    let searchValue = searchNote.value.toLowerCase();
    let notes = document.getElementsByClassName('note');
    Array.from(notes).forEach(function(element){
        let noteText = element.getElementsByTagName('div')[0].innerText;
        if(noteText.includes(searchValue)){
            element.style.display = 'block';
        }else{
            element.style.display = 'none';
        }
    })
}

//archive notes
function archiveNote(ind){
    let notes = localStorage.getItem('notes');
    if(notes === null){
        return;
    }else{
        notes = JSON.parse(notes);
    }
    let archiveNotes = localStorage.getItem('archiveNotes');
    if(archiveNotes === null){
        archiveNotes = [];
    }else{
        archiveNotes = JSON.parse(archiveNotes);
    }
    archiveNotes.push(notes[ind]);
    localStorage.setItem('archiveNotes', JSON.stringify(archiveNotes));
    notes.splice(ind, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();

    showArchiveNotes();
}
function showArchiveNotes(){  
    let archiveNotesHTML = '';
    let archiveNotes = localStorage.getItem('archiveNotes');
    if(archiveNotes === null){
        return;
    }else{
        archiveNotes = JSON.parse(archiveNotes);
    }
    for(let i=0; i<archiveNotes.length; i++){
        archiveNotesHTML += `<div class="note">
                        <span class="title">${archiveNotes[i].title === "" ? 'Note' : archiveNotes[i].title}</span>
                        <hr>
                        <div class="text">${archiveNotes[i].text}</div>
                        <button class="deleteNote" id=${i} onclick="deleteArchiveNotes(${i})"> <span class="material-symbols-outlined">
                        delete
                      </span></button>
                        <button class="undoNote" id=${i} onclick="undoArchiveNotes(${i})">Undo</button>
                    </div>`
    }
    archiveDiv.innerHTML = archiveNotesHTML;
}
function deleteArchiveNotes(ind){
    let archiveNotes = localStorage.getItem('archiveNotes');
    let trashNotes = localStorage.getItem('trashNotes');
    if(archiveNotes === null){
        return;
    }else{
        archiveNotes = JSON.parse(archiveNotes);
    }
    if(trashNotes === null){
        trashNotes = [];
    }else{
        trashNotes = JSON.parse(trashNotes);
    }
    trashNotes.push(archiveNotes[ind]);
    localStorage.setItem('trashNotes', JSON.stringify(trashNotes));
     
    archiveNotes.splice(ind, 1);
    localStorage.setItem('archiveNotes', JSON.stringify(archiveNotes));
    showArchiveNotes();
}
function undoArchiveNotes(ind){
    let notes = localStorage.getItem('notes');
    if(notes === null){
        notes = [];
    }else{
        notes = JSON.parse(notes);
    }
    let archiveNotes = localStorage.getItem('archiveNotes');
    if(archiveNotes === null){
        return;
    }else{
        archiveNotes = JSON.parse(archiveNotes);
    }
    notes.push(archiveNotes[ind]);
    localStorage.setItem('notes', JSON.stringify(notes));
    archiveNotes.splice(ind, 1);
    localStorage.setItem('archiveNotes', JSON.stringify(archiveNotes));
    showArchiveNotes();
}

// selectors

const noteTextElm = document.querySelector('.writeNote textarea')
const noteTextSaveBtnElm = document.querySelector('.saveBtn .savedBtn')
const updBtnElm = document.querySelector('#updsBtn')
const noteEditBtnElm = document.querySelectorAll('.editNote')
const noteDeleteElm = document.querySelectorAll('.deleteNote')

const saveNotesPlaceElm = document.querySelector('.savedNotes')


let noteArr = JSON.parse(localStorage.getItem('Note')) || []

noteTextSaveBtnElm.addEventListener('click', ()=> {
    const isValid = noteTextVal()
    if(isValid){
        alert('Please Write Some Text')
    }else{
        gettingNoteValue()
        noteTextElm.value = ''
        showDataInUi()
    }
})

updBtnElm.addEventListener('click', () => {
    updBtnElm.style.display = 'none'
    noteTextSaveBtnElm.style.display = 'block'

    const id = getId(updBtnElm.classList)

    updateNoteArrAfterUpdate(id)

})


document.addEventListener('DOMContentLoaded', () => {
    showDataInUi()
    updateOnChange()
})



function getId(target){
    return target[0].split('-')[1]
}

function updateArrAfterDelete(id){
    noteArr = noteArr.filter( note => note.id !== Number(id))
    // console.log(noteArr);
    showDataInUi()
}

function noteTextVal(){
    let isValid = false
    if(!noteTextElm.value){
        isValid = true
    }else{
        isValid = false
    }
    return isValid
}

function gettingNoteValue(){
    let noteId = 0

    if(noteArr.length == 0){
        noteId = 0
    }else{
        noteId = noteArr[noteArr.length-1].id + 1
    }

    noteArr.push({
        id : noteId,
        note : noteTextElm.value
    })
    
}

function showDataInUi(){
    saveNotesPlaceElm.innerHTML = ''

    noteArr.map( note => {
        let htmlElm = `
            <div class="notes">
                <div class="tools">
                    <button class="id-${note.id} editNote"><i class="fa-solid fa-pen"></i></button>

                    <button class="id-${note.id} deleteNote"><i class="fa-solid fa-trash-can"></i></button>
                </div>
                <div class="note">${note.note}</div>
            </div>
        `
        saveNotesPlaceElm.innerHTML += htmlElm
    })
    
    updateOnChange()
    
}

function deleteNoteFunc(){
    const deleteNoteBtn = document.querySelectorAll('.deleteNote')

    for(let i = 0 ; i < deleteNoteBtn.length; i++){
        deleteNoteBtn[i].addEventListener('click', () => {
            const id = getId(deleteNoteBtn[i].classList)
            console.log('yss');
            updateArrAfterDelete(id)
        })
    }

}

function updateNoteFunc(){
    const editBtnElm = document.querySelectorAll('.editNote')

    for(let i = 0; i < editBtnElm.length; i++){
        editBtnElm[i].addEventListener('click', () => {
            const id = getId(editBtnElm[i].classList)
            getInfoForEdit(id)
            updBtnElm.classList.add(`id-${id}`)
            document.querySelector('.savedBtn').style.display = 'none'
            updBtnElm.style.display = 'block'
        })
    }
}

function getInfoForEdit(id){
    const targetNote = noteArr.find( note => note.id == Number(id))
    document.querySelector('.writeNote textarea').value = targetNote.note
}

function updateOnChange(){
    deleteNoteFunc()
    updateNoteFunc()
    setDataInLocalStorage()
}

function setDataInLocalStorage(){
    localStorage.setItem('Note', JSON.stringify(noteArr))
}

function updateNoteArrAfterUpdate(id){
    const updateNoteTextElm = noteArr.find( note => note.id == Number(id))
    updateNoteTextElm.note = noteTextElm.value
    noteTextElm.value = ''
    showDataInUi()
}


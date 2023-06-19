const addElButton = document.querySelector('#add')
const searchElButton = document.querySelector('#search')
const deleteElButton = document.querySelector('#delete')
const mainEl = document.querySelector('.container-Main')
const addInput = document.querySelector('.container-Add')
const searchInput = document.querySelector('.container-Search')
const deleteInput = document.querySelector('.container-Delete')
console.log(addElButton, mainEl)

addElButton.addEventListener('click', () => {
    console.log(addInput.style.display)
    addInput.style.display = 'flex'
    console.log("clicked")
    mainEl.style.display = 'none'
})

document.querySelector('#addBack').addEventListener('click', () => {
    mainEl.style.display = 'flex'
    addInput.style.display = 'none'
})

searchElButton.addEventListener('click', () => {
    searchInput.style.display = 'flex'
    mainEl.style.display = 'none'
})

document.querySelector('#searchBack').addEventListener('click', () => {
    mainEl.style.display = 'flex'
    searchInput.style.display = 'none'
})

deleteElButton.addEventListener('click', () => {
    deleteInput.style.display = 'flex'
    mainEl.style.display = 'none'
})

document.querySelector('#deleteBack').addEventListener('click', () => {
    mainEl.style.display = 'flex'
    deleteInput.style.display = 'none'
})




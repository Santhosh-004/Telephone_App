const addElButton = document.querySelector('#add')
const searchElButton = document.querySelector('#search')
const deleteElButton = document.querySelector('#delete')
const mainEl = document.querySelector('.container-Main')
const addInput = document.querySelector('.container-Add')
const searchInput = document.querySelector('.container-Search')
const deleteInput = document.querySelector('.container-Delete')

let contact = {
    id: [1, 2],
    name: ['abcd', 'defg'],
    number: ['1234569420', '0249654321'],
    count: 3
}

let retrieve

const check = localStorage.getItem("stored")

if (check) {
    contact = JSON.parse(localStorage.getItem("stored"))
    console.log(contact)
} else {
    localStorage.setItem("stored", JSON.stringify(contact))
}

render_table(contact)

function render_table(pass) {
    document.querySelector('#show-Table').innerHTML = ''
    console.log('inside render', pass.id.length)
    for (let i=0; i < pass.count-1; i++) {
        document.querySelector('#show-Table').innerHTML += `
                <tr>
                    <td>${pass.name[i]}</td>
                    <td>${pass.number[i]}</td>
                </tr>`
    }
}

addElButton.addEventListener('click', () => {
    document.querySelector('.contact-Table').style.display = 'none'
    addInput.style.display = 'flex'
    document.querySelector('.add-done').style.display = 'none'
    console.log("clicked")
    mainEl.style.display = 'none'
})

document.querySelector('#submit-Add').addEventListener('click', () => {
    let t_name = document.querySelector('#name').value
    let t_number = document.querySelector('#number').value
    console.log(t_name, t_number)
    contact.id.push(contact.count++)
    contact.name.push(t_name)
    contact.number.push(t_number)
    localStorage.setItem("stored", JSON.stringify(contact))
    document.querySelector('#name').value = ''
    document.querySelector('#number').value = ''
    document.querySelector('.add-done').style.display = 'block'

})

document.querySelector('#addBack').addEventListener('click', () => {
    mainEl.style.display = 'flex'
    addInput.style.display = 'none'
    render_table(contact)
    document.querySelector('.contact-Table').style.display = 'flex'
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




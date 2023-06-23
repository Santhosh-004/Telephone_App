// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js"
import { getDatabase, ref, set, get, update, child, remove } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzvkAqXOI6qijfLnXJL5w5UX622l4jeQA",
  authDomain: "telephone-70fe0.firebaseapp.com",
  projectId: "telephone-70fe0",
  storageBucket: "telephone-70fe0.appspot.com",
  messagingSenderId: "101553912256",
  appId: "1:101553912256:web:77f0538b16396b8e1a3025",
  databaseURL: "https://telephone-70fe0-default-rtdb.asia-southeast1.firebasedatabase.app"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = getDatabase(app)


const addElButton = document.querySelector('#add')
const searchElButton = document.querySelector('#search')
const deleteElButton = document.querySelector('#delete')
const mainEl = document.querySelector('.container-Main')
const addInput = document.querySelector('.container-Add')
const searchInput = document.querySelector('.container-Search')
const deleteInput = document.querySelector('.container-Delete')


let contact = {
    name: [],
    number: [],
}


/*
const check = localStorage.getItem("stored")

if (check) {
    contact = get_firebase()
    //console.log(contact)
} else {
    localStorage.setItem("stored", JSON.stringify(contact))
}
*/



function render_table(pass) {
    document.querySelector('#show-Table').innerHTML = ''
    console.log('inside render', pass)
    for (let i=0; i < pass.name.length; i++) {
        document.querySelector('#show-Table').innerHTML += `
                <tr>
                    <td>${pass.name[i]}</td>
                    <td>${pass.number[i]}</td>
                </tr>`
    }
}

function get_firebase() {
    return new Promise((resolve, reject) => {
      let contact_t = {
        name: [],
        number: [],
      }
      const dbref = ref(db)
      get(child(dbref, "contact"))
        .then((snapshot) => {
          snapshot.forEach((childSnapshot) => {
            contact_t.name.push(childSnapshot.val().name)
            contact_t.number.push(childSnapshot.val().number)
          })
          resolve(contact_t)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

get_firebase()
  .then((contactData) => {
    //console.log(contactData)
    contact = contactData
    render_table(contact)
    // Continue with your code using the contactData
  })
  .catch((error) => {
    //console.error(error)
  })



addElButton.addEventListener('click', () => {
    document.querySelector('.contact-Table').style.display = 'none'
    addInput.style.display = 'flex'
    document.querySelector('.add-done').style.display = 'none'
    //console.log("clicked")
    mainEl.style.display = 'none'
})

document.querySelector('#submit-Add').addEventListener('click', () => {
    let t_name = document.querySelector('#name').value
    let t_number = document.querySelector('#number').value
    //console.log(t_name, t_number)
    contact.name.push(t_name)
    contact.number.push(t_number)

    let save = t_name+' '+t_number

    set(ref(db, 'contact/' + save), {
        name: t_name,
        number: t_number
    })
    .then(() => {
        alert("Added Successfully")
    })
    .catch((error) => {
        //console.error(error)
    })

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
    get_firebase()
    render_table(contact)
})

document.querySelector('#search-btn').addEventListener('click', ()=> {
    get_firebase()
    let init = contact
    //console.log('init', init)
    let final = {
        id: [],
        name: [],
        number: [],
        count: 1
    }
    //console.log('here',init)
    for (let i=0; i < init.name.length; i++) {
        let snew = init.name[i]+' '+init.number[i]
        //console.log('snew', snew, init.count)
        if (snew.includes(document.querySelector('#search-txt').value)) {
            final.id.push(i+1)
            final.name.push(init.name[i])
            final.number.push(init.number[i])
            final.count++
        } else {
            //console.log("not exists")
        }
    }
    //console.log("final", final)
    render_table(final)
})

deleteElButton.addEventListener('click', () => {
    deleteInput.style.display = 'flex'
    mainEl.style.display = 'none'
})

document.querySelector('#deleteBack').addEventListener('click', () => {
    mainEl.style.display = 'flex'
    deleteInput.style.display = 'none'
    document.querySelector('.delete-done').style.display = 'none'
    get_firebase()
    .then((contactData) => {
        contact = contactData
        console.log(contact)
        render_table(contact)
    })

})

document.querySelector('#delete-btn').addEventListener('click', () => {
    get_firebase()
    let init = contact
    console.log('here', init)
    let found = false
    for (let i=0; i < init.name.length; i++) {
        
        if (init.name[i] === document.querySelector('#delete-txt').value || init.number[i] === document.querySelector('#delete-txt').value) {
            console.log('came here up')
            let rem = init.name[i]+' '+init.number[i]
            remove(ref(db, 'contact/' + rem))
            .then(() => {
                document.querySelector('.delete-done').innerHTML = `<p>Deleted Successfully</p>`
                document.querySelector('.delete-done').style.display = 'block'
            })
            found = true
        }
    }
    if (found==false) {
        console.log('came here')
        document.querySelector('.delete-done').innerHTML = `<p>Does not Exist, Try Again</p>`
        document.querySelector('.delete-done').style.display = 'block'
    }
})



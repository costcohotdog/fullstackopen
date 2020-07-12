const express = require('express')
const { response } = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
        "name": "John Loper",
        "number": "831-234-3454",
        "id": 1
    },
    {
        "name": "Alison Deshong",
        "number": "949-234-5738",
        "id": 2
    },
    {
        "name": "Shoalie",
        "number": "714-251-2324",
        "id": 3
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(note => note.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const person = req.body

    if (!person.name || !person.number) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    person.id = Math.floor(Math.random() * 10000)
    const name = persons.find(entry => entry.name === person.name)

    if (name) {
        return res.status(400).json({
            error: `${person.name} is already in the phonebook`
        })
    }

    persons.push(person)
    res.json(persons)
})

app.get('/info', (req, res) => {
    const phonebookLength = persons.length
    const timeStamp = new Date()
    res.send(`
        <p>Phonebook has info for ${phonebookLength} people.
        </p> <p>${timeStamp}</p>
        `)
})

const PORT = 3001
app.listen(PORT , () => {
    console.log(`Server running on port ${PORT}`)
})
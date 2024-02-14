import express from 'express'
import cors from 'cors'
import livres from './books.js'

const PORT = 3000

const app = express() 
app.use(express.json())
app.use(cors())

app.get('/catalogue', (req, res) => {
    res.status(207).json(livres)
})

app.get('/livre/:id', (req, res) => {
    const id = req.params.id
    const selectedLivre = livres.filter(e => e.id == id)
    console.log(selectedLivre)
    if(selectedLivre.length > 0)
        res.status(201).json(selectedLivre[0])
    else 
        res.sendStatus(404)
})

app.post('/livre', (req, res) => {
    const livre = req.body
    livres.push(livre)
    res.json(livre)
})

app.put('/livre', (req, res) => {
    const livre = req.body
    for(let i=0;i<livres.length;i++){
        if(livres[i].id == livre.id) {
            livres[i].titre=livre.titre
            livres[i].prix=livre.prix
            livres[i].url=livre.url
            break;
        }
    }
    res.sendStatus(202)
})

app.delete('/livre/:id', (req, res) => {
    const id = req.params.id
    for(let i=0;i<livres.length;i++){
        if(livres[i].id == id) {
            livres.splice(i,1)
            console.log(i)
            break;
        }
    }
    res.sendStatus(210)
})

app.listen(PORT, (err) => {
    if(!err)
        console.log('Server started')
    else
        console.log('Server not started')
})
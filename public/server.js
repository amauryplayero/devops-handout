const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(express.static('public'))




// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
    accessToken: 'c8be8bd5948e4f82b9d81af8c810ddbf',
    captureUncaught: true,
    captureUnhandledRejections: true,
    captureIp: true
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

const students = ['Jimmy', 'Timothy', 'Jimothy']

// app.get('/', function(req,res){
    //     res.sendFile(path.join(__dirname, '../index.html'))
    // });
    
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '/index.html'))
    })
    
    app.get('/api/students', (req, res) => {
        res.status(200).send(students)
        rollbar.log('hi log works.')
        
    })
    
    app.post('/api/students', (req, res) => {
        let {name} = req.body
        
        const index = students.findIndex(student => {
            return student === name
        })
         
        try {
            if (index === -1 && name !== '') {
                students.push(name)
                res.status(200).send(students)
            } else if (name === ''){
                res.status(400).send('You must enter a name.')
            } else {
                res.status(400).send('That student already exists.')
            }
        } catch (err) {
            console.log(err)
        }
    })
    
    app.delete('/api/students/:index', (req, res) => {
        const targetIndex = +req.params.index
        
        students.splice(targetIndex, 1)
        res.status(200).send(students)
        rollbar.critical('DELETED STUDENTS FOREVER BITCHES')
    })
    
    const port = process.env.PORT || 5050
    
    app.listen(port, () => console.log(`Server listening on ${port}`))
    

        
        try{
            nonExist()
        } catch(error) {
            rollbar.warning('nonExist() does not exist')
        }

const { request, response } = require("express")
const express = require ("express")
const uuid = require("uuid")
const port = 3001
const app = express()
app.use(express.json())

/*
        Query parans => meusite.com/users?name=marcelo&idade=32  //FILTROS
        Route parans => /user/2  //BUSCAR< DELETAR OU ATUALIZAR ALGO ESPECIFICO 
*/

const users =[]

const checkUserId = (request, response, next) =>{

    const {id} = request.params
    const index = users.findIndex(user => user.id === id)
    if (index <  0){
        return response.status(404).json({message: "User not Found"})
    }

    request.userIndex = index
    request.userId = id
    next()
}



app.get("/useres",(request,response) => {
    return response.json(users)
})

app.post("/useres", (request, response) =>{

    const {name, age} = request.body
    

    const user = {id: uuid.v4(),name,age}

    users.push(user)

    return response.status(201).json(user)
})

app.put("/useres/:id",checkUserId,(request,response) => {
    
    const {name, age} = request.body
    const index = request.userIndex
    const id = request.userId
    const updateUser = {id, name, age}
    
    users[index] = updateUser
    
    return response.status(200).json(updateUser)
})
app.delete("/useres/:id",checkUserId,(request,response) => {
    
    const index = request.userIndex
    users.splice(index,1)

    return response.status(204).json({
        error:false,
        message: "Usuario deletado com sucesso"
    })
})










app.listen(port, () => {     
    console.log(`🎶 Server started on port ${port}`)
})
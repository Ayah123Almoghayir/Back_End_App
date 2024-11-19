const express= require('express')
const app=express()
const Users=[]
app.use(express.json())

app.get('/users', (req , res)=>{
    if (Users.length == 0) {
        res.status(404).send("No users found!");
        return;
      }
      res.status(200).send(Users);
});
app.post("/users", (request, response) => {
    const user = request.body;
    const findUser = Users.find((x) => x.id === user.id);
    if (findUser) {
      response.status(400).send("User already exists");
      return;
    }
    Users.push(user);
    response.status(201).send("Created!");
  });
  app.delete('/users/:id', (request, response) => {
    const { id } = request.params
    const findUserIndex = Users.findIndex((x) => x.id === id)
    if(findUserIndex == -1) {
        response.status(400).send("User not found!")
        return
    }
    Users.splice(findUserIndex, 1)
    response.status(200).send("User deleted successfully!")
})
app.listen(3000,()=>{
    console.log("Server start");
})
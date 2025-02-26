import Team from "../model/Team.js"

const createTeam=async (req, res) => {
    const {name, description} = req.body

    if(!name || !description){
        return res.status(400).json({msg:"all fields are required"})
    }

    const response = await Team.create({
        name,
        description,
        members:[],
        createdBy:req.user.id
    })

    if(response){
        return res.status(200).json({msg:"team created"})
    }
    else{
        return res.status(400).json({msg:"team not created"})
    }
}

const createTeamMembers=async (req, res) => {
    const {id, name, email, role, task}=req.body

    if(!name || !email || !role || !task){
        return res.status(400).json({msg:"all fields are required"})
    }

    const data ={name, email, role, task}

    const getteam = await Team.findById(id)

    if(getteam){
        getteam.members.push(data)
        await getteam.save()
        return res.status(200).json({msg:"team member added"})
    }
    else{
        return res.status(400).json({msg:"couldn't find team"})
    }
}

const getTeams=async (req, res) => {
    try {
        const response = await Team.find({})
    
        if(response){
            return res.status(200).json(response)
        }
        else{
            return res.status(400).json({mag:"no team found"})
        }
    } catch (error) {
        console.log("error in fetching teams ", error)
    }
}

export {createTeam, createTeamMembers, getTeams}
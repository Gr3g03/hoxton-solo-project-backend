import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import "dotenv/config"

const app = express()
app.use(cors())
app.use(express.json())

const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] })

function createToken(id: number) {
    //@ts-ignore
    return jwt.sign({ id: id }, process.env.MY_SECRET)

}


async function getUserFromToken(token: string) {
    // @ts-ignore
    const decodedData = jwt.verify(token, process.env.MY_SECRET)
    const user = await prisma.user.findUnique({
        // @ts-ignore
        where: { id: decodedData.id },
        include: { reservations: true, reviews: true, rooms: { include: { reviews: true, reservations: true } } }
    })

    return user
}


app.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password, photo, phone_number, dateCreated } = req.body

    try {
        const hash = bcrypt.hashSync(password, 8)
        const user = await prisma.user.create({
            data: { firstName: firstName, lastName: lastName, email: email, password: hash, photo: photo, phone_number: phone_number, dateCreated: dateCreated }
        })
        res.send({ user, token: createToken(user.id) })
    }
    catch (err) {
        // @ts-ignore
        res.status(400).send({ error: err.message })
    }
})


app.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
            include: { reservations: true, reviews: true, rooms: { include: { reviews: true, reservations: true } } }
        })
        //@ts-ignore
        const passwordMatch = bcrypt.compareSync(password, user.password)
        if (user && passwordMatch) {
            res.send({ user, token: createToken(user.id) })
        }
        else {
            throw Error('Something went wrong')
        }
    }
    catch (err) {
        //@ts-ignore
        res.status(400).send({ error: 'User or password invalid' })
    }
})

app.get('/validate', async (req, res) => {
    const token = req.headers.authorization || ' '

    try {
        // @ts-ignore
        const user = await getUserFromToken(token)
        res.send(user)
    } catch (err) {
        // @ts-ignore
        res.status(400).send({ error: err.message })
    }
})



app.listen(4000, () => {
    console.log('Server running: http://localhost:4000')
})
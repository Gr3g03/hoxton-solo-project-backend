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

app.get('/rooms', async (req, res) => {
    const rooms = await prisma.rooms.findMany({ include: { reviews: true } })
    res.send(rooms)
})

app.get('/rooms/:id', async (req, res) => {
    const id = Number(req.params.id)
    try {
        const room = await prisma.rooms.findFirst({
            where: { id },
            include: { reviews: true }
        })
        if (room) {
            res.send(room)
        } else {
            res.status(404).send({ error: 'room not found' })
        }
    }
    catch (error) {
        //@ts-ignore
        res.status(400).send({ error: 'room not found' })
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


app.post('/reservations', async (req, res) => {

    const { userId, roomId, price, start_date, end_date, total, created_at, updated_at } = req.body
    try {
        const doExists = await prisma.reservations.findFirst({ where: { userId: userId, roomId: roomId } })
        if (doExists) throw new Error
        else {
            const newRoom = await prisma.reservations.create({ data: { userId: userId, roomId: roomId, price: price, start_date: start_date, end_date: end_date, total: total, created_at: created_at, updated_at: updated_at } })
            res.send(newRoom)
        }

    } catch (err) {
        // @ts-ignore
        res.status(400).send(err.message)
    }
})

app.post('/rooms', async (req, res) => {
    const { home_type, room_type, total_occupancy, total_bedrooms, total_bathrooms, address, has_tv, has_kitchen, has_air_con, has_heating, has_Internet, price, photo, published_at, created_at, stars, userId, ownerId } = req.body

    try {
        const doExists = await prisma.reservations.findFirst({ where: { userId: userId } })
        if (doExists) throw new Error
        else {
            // @ts-ignore
            const newRoom = await prisma.reservations.create({ data: { home_type: home_type, room_type: room_type, total_occupancy: total_occupancy, total_bedrooms: total_bedrooms, total_bathrooms: total_bathrooms, address: address, has_tv: has_tv, has_kitchen: has_kitchen, has_air_con: has_air_con, has_heating: has_heating, has_Internet: has_Internet, price: price, photo: photo, published_at: published_at, created_at: created_at, stars: stars, userId: userId, ownerId: ownerId } })
            res.send(newRoom)
        }

    } catch (err) {
        // @ts-ignore
        res.status(400).send(err.message)
    }
})


app.listen(4000, () => {
    console.log('Server running: http://localhost:4000')
})
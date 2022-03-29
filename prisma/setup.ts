import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] })


const rooms = [
    {
        home_type: 'appartament',
        room_type: 'small',
        total_occupancy: 1,
        total_bedrooms: 1,
        total_bathrooms: 1,
        address: 'Durres',
        has_tv: 1,
        has_kitchen: 1,
        has_air_con: 1,
        has_heating: 1,
        has_Internet: 1,
        price: 200,
        published_at: "21.03.2022",
        created_at: "21.03.2022",
        userId: 1
    },
    {
        home_type: 'appartament',
        room_type: 'big',
        total_occupancy: 5,
        total_bedrooms: 2,
        total_bathrooms: 1,
        address: 'Durres',
        has_tv: 1,
        has_kitchen: 1,
        has_air_con: 1,
        has_heating: 1,
        has_Internet: 1,
        price: 200,
        published_at: "21.03.2022",
        created_at: "21.03.2022",
        userId: 1
    }
]


// const reservations = [
//     {
//         start_date: ' 21.03.2022',
//         end_date: '21.03.2022',
//         price: 100,
//         total: 100,
//         created_at: '21.03.2022',
//         updated_at: '21.03.2022',
//         userId: 1,
//         roomId: 2
//     },
//     {
//         start_date: ' 21.03.2022',
//         end_date: '21.03.2022',
//         price: 100,
//         total: 100,
//         created_at: '21.03.2022',
//         updated_at: '21.03.2022',
//         userId: 1,
//         roomId: 1
//     }
// ]

// const reviews = [
//     {
//         rating: 5,
//         comment: 'text',
//         roomId: 1,
//         userId: 1,
//     }
// ]



async function createStuff() {
    for (const room of rooms) {
        await prisma.rooms.create({ data: room })
    }
    // for (const reservation of reservations) {
    //     await prisma.reservations.create({ data: reservation })
    // }
    // for (const review of reviews) {
    //     await prisma.reviews.create({ data: review })
    // }
}

createStuff()

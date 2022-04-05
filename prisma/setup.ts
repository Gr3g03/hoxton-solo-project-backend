import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] })


const rooms = [
    {
        home_type: 'appartament',
        room_type: '1 guest · 1 bedroom · 1 bed · 1.5 shared bthrooms · Wifi · Kitchen · Free parking · Washing Machine',
        total_occupancy: 'yes',
        total_bedrooms: 'yes',
        total_bathrooms: 'yes',
        address: 'Private room in center of London',
        has_tv: 'yes',
        has_kitchen: 'yes',
        has_air_con: 'yes',
        has_heating: 'yes',
        has_Internet: 'yes',
        price: 55,
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_wbPYTxQPMcBh7SPzLFActXnP3uhifeVT_g&usqp=CAU',
        published_at: "21.03.2022",
        created_at: "21.03.2022",
        stars: 5,
        userId: 1,
        ownerId: 1
    },
    {
        home_type: 'appartament',
        room_type: '2 guest · 3 bedroom · 1 bed · 1.5 shared bthrooms · Wifi · Kitchen',
        total_occupancy: 'yes',
        total_bedrooms: 'yes',
        total_bathrooms: 'yes',
        address: 'Private room in center of London',
        has_tv: 'yes',
        has_kitchen: 'yes',
        has_air_con: 'yes',
        has_heating: 'yes',
        has_Internet: 'yes',
        price: 40,
        stars: 6,
        photo: 'https://www.expatkings.com/wp-content/uploads/2018/10/Airbnb-rental-tips.-Hostmaker-1-620x349.jpg',
        published_at: "21.03.2022",
        created_at: "21.03.2022",
        userId: 1,
        ownerId: 1
    },
    {
        home_type: 'appartament',
        room_type: '4 guest · 4 bedroom · 4 bed · 2 bathrooms · Free parking · Washing Machine',
        total_occupancy: 'yes',
        total_bedrooms: 'yes',
        total_bathrooms: 'yes',
        address: 'Private room in center of London',
        has_tv: 'yes',
        has_kitchen: 'yes',
        has_air_con: 'yes',
        has_heating: 'yes',
        has_Internet: 'yes',
        price: 35,
        photo: 'https://www.smartertravel.com/uploads/2017/07/Untitled-design-8.jpg',
        published_at: "21.03.2022",
        created_at: "21.03.2022",
        stars: 10,
        userId: 1,
        ownerId: 1
    },
    {
        home_type: 'appartament',
        room_type: '1 guest · 1 bedroom · 1 bed · 1.5 shared bthrooms · Wifi · Kitchen · Free parking · Washing Machine',
        total_occupancy: 'yes',
        total_bedrooms: 'yes',
        total_bathrooms: 'yes',
        address: 'Private room in center of London',
        has_tv: 'yes',
        has_kitchen: 'yes',
        has_air_con: 'yes',
        has_heating: 'yes',
        has_Internet: 'yes',
        price: 55,
        stars: 20,
        photo: 'https://cdn.bisnow.net/fit?height=489&type=jpeg&url=https%3A%2F%2Fs3.amazonaws.com%2Fcdn.bisnow.net%2Fcontent%2Fimages%2F2017%2F05%2F59151d0978bbf_https_press_atairbnb_com_app_uploads_2016_12_midtown_4.jpeg&width=717&sign=FeltIPi9cOWA36nVIeDvZxwgtiCZrpUyMRdvyZviTUI',
        published_at: "21.03.2022",
        created_at: "21.03.2022",
        userId: 1,
        ownerId: 1
    },
    {
        home_type: 'appartament',
        room_type: '3 guest · 1 bedroom · 1 bed · 1.5 shared bthrooms · Wifi · Free parking · Dry Cleaning"',
        total_occupancy: 'yes',
        total_bedrooms: 'yes',
        total_bathrooms: 'yes',
        address: 'Private room in center of London',
        has_tv: 'yes',
        has_kitchen: 'yes',
        has_air_con: 'yes',
        has_heating: 'yes',
        has_Internet: 'yes',
        price: 35,
        photo: 'https://media.cntraveler.com/photos/5a8f258bd363c34048b35aac/master/w_2250,h_1500,c_limit/airbnb-plus-london.jpg',
        published_at: "21.03.2022",
        created_at: "21.03.2022",
        stars: 5,
        userId: 1,
        ownerId: 1
    },
    {
        home_type: 'appartament',
        room_type: '2 guest · 1 bedroom · 1 bed · 1.5 shared bthrooms · Wifi · Washing Machine',
        total_occupancy: 'yes',
        total_bedrooms: 'yes',
        total_bathrooms: 'yes',
        address: 'Private room in center of London',
        has_tv: 'yes',
        has_kitchen: 'yes',
        has_air_con: 'yes',
        has_heating: 'yes',
        has_Internet: 'yes',
        price: 35,
        photo: 'https://static.trip101.com/paragraph_media/pictures/001/676/061/large/969ae4bb-efd1-4fb9-a4e3-5cb3316dd3c9.jpg?1562227937',
        published_at: "21.03.2022",
        created_at: "21.03.2022",
        stars: 50,
        userId: 1,
        ownerId: 1
    }
]

const owners = [
    {
        firstName: 'Grigor',
        lastName: 'Godole'
    }
]


const reservations = [
    {
        start_date: ' 21.03.2022',
        end_date: '21.03.2022',
        price: 100,
        total: 100,
        created_at: '21.03.2022',
        updated_at: '21.03.2022',
        userId: 1,
        roomId: 2
    },
    {
        start_date: ' 21.03.2022',
        end_date: '21.03.2022',
        price: 100,
        total: 100,
        created_at: '21.03.2022',
        updated_at: '21.03.2022',
        userId: 1,
        roomId: 1
    }
]

const reviews = [
    {
        rating: 5,
        comment: 'text',
        roomId: 1,
        userId: 1,
    }
]



async function createStuff() {
    // for (const room of rooms) {
    //     await prisma.rooms.create({ data: room })
    // }
    // for (const owner of owners) {
    //     await prisma.owner.create({ data: owner })
    // }
    for (const reservation of reservations) {
        await prisma.reservations.create({ data: reservation })
    }
    for (const review of reviews) {
        await prisma.reviews.create({ data: review })
    }
}

createStuff()

const {PrismaClient} = require("@prisma/client");

const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                {name: "Computer Science"},
                {name: "Music"},
                {name: "Fitness"},
                {name: "Photography"},
                {name: "Accounting"},
                {name: "Engineering"},
                {name: "Filming"},
                {name: "Science"},
            ]
        });
        console.log("Success");
    } catch (err) { 
        console.log(err,"Error seeding the database category and question");
    } finally {
        await database.$disconnect();
    }
}

main();
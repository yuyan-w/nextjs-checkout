const { PrismaClient } = require("@prisma/client");
const {
  users,
  premiumArticles,
  standardArticles,
  freeArticles,
} = require("./data.js");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function seedUsers() {
  try {
    await prisma.user.deleteMany({});

    const insertUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        return prisma.user.create({ data: { ...user } });
      })
    );
    console.log(`Seeded ${insertUsers.length} users`);
  } catch (error) {
    console.error("Error seeding users:", error);
  }
}

async function seedArticles() {
  const seedRecords = [
    { level: "Free", articles: freeArticles },
    { level: "Standard", articles: standardArticles },
    { level: "Premium", articles: premiumArticles },
  ];
  try {
    await prisma.article.deleteMany({});

    seedRecords.forEach(async (records) => {
      const insertArticles = await Promise.all(
        records.articles.map(async (article) => {
          const date = getRandomDate(30);
          return prisma.article.create({
            data: {
              ...article,
              createdAt: date,
              updatedAt: date,
              accessLevel: records.level,
            },
          });
        })
      );
      console.log(`Seeded ${insertArticles.length} articles(${records.level})`);
    });
  } catch (error) {
    console.error("Error seeding articles:", error);
  }
}

function getRandomDate(daysAgo) {
  const today = new Date();
  const pastDate = new Date(
    today.getTime() - Math.random() * daysAgo * 24 * 60 * 60 * 1000
  );
  return pastDate;
}

(async () => {
  await seedUsers();
  await seedArticles();
})();

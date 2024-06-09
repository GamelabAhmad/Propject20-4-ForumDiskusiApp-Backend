const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

(async () => {
  try {
    const comments = await prisma.comments.findMany({
      include: {
        commentedBy: true,
        question: true,
      },
    });

    console.log(comments);
  } catch (error) {
    console.error("Error fetching comments:", error.message);
  } finally {
    await prisma.$disconnect();
  }
})();

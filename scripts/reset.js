const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function resetTestClock() {
  try {
    const updateUsers = await prisma.user.updateMany({
      data: {
        customerId: null,
      },
    });
    console.log(`ユーザーのcustomerIdにnullをセット`);
  } catch (error) {
    console.error(error);
  }

  try {
    const deletedSubscription = await prisma.subscription.deleteMany({});
    console.log(`サブスクリプションを削除`);
  } catch (error) {
    console.error(error);
  }
}

(async () => {
  await resetTestClock();
})();

import { PrismaClient } from "@prisma/client";

const globalForPrisma = global;

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;




// import { PrismaClient } from "@prisma/client";

// let prisma;

// if (process.env.NODE_ENV !== "production") {
//   // Use a global variable in development to avoid creating multiple instances
//   if (!global.prisma) {
//     global.prisma = new PrismaClient();
//   }
//   prisma = global.prisma;
// } else {
//   prisma = new PrismaClient();
// }

// export { prisma };

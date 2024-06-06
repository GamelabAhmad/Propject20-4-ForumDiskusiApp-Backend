-- CreateTable
CREATE TABLE `Questions` (
    `uuid` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `body` TEXT NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `imageUrl` VARCHAR(191) NOT NULL,
    `forumID` VARCHAR(191) NULL,
    `topicsID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Questions` ADD CONSTRAINT `Questions_forumID_fkey` FOREIGN KEY (`forumID`) REFERENCES `Forums`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Questions` ADD CONSTRAINT `Questions_topicsID_fkey` FOREIGN KEY (`topicsID`) REFERENCES `Topics`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

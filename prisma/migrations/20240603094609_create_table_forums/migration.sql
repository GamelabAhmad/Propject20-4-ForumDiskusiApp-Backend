-- CreateTable
CREATE TABLE `Forums` (
    `uuid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UserId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Forums_name_key`(`name`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Forums` ADD CONSTRAINT `Forums_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE `Topics` (
    `uuid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdByUser` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Topics_name_key`(`name`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Topics` ADD CONSTRAINT `Topics_createdByUser_fkey` FOREIGN KEY (`createdByUser`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

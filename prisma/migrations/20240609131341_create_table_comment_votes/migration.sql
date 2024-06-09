-- CreateTable
CREATE TABLE `CommentVotes` (
    `uuid` VARCHAR(191) NOT NULL,
    `commentId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `role` ENUM('VOTE', 'DOWNVOTE') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CommentVotes` ADD CONSTRAINT `CommentVotes_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comments`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentVotes` ADD CONSTRAINT `CommentVotes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

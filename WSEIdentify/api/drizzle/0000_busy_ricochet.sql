CREATE TABLE `budgetCodes` (
	`budgetCode` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`alias` text,
	`isSeniorDesign` integer DEFAULT 0,
	`isLab` integer DEFAULT 0,
	`isClass` integer DEFAULT 1
);
--> statement-breakpoint
CREATE TABLE `machines` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`hourly rate` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `override_transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`timeSpent` integer NOT NULL,
	`machine` text,
	`userJid` integer NOT NULL,
	`dateAdded` integer NOT NULL,
	FOREIGN KEY (`machine`) REFERENCES `machines`(`name`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`moneySpent` integer NOT NULL,
	`budgetCode` integer,
	`budgetAlias` text,
	`machine` integer,
	`userJHED` text,
	`dateAdded` integer NOT NULL,
	FOREIGN KEY (`budgetCode`) REFERENCES `budgetCodes`(`budgetCode`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`budgetAlias`) REFERENCES `budgetCodes`(`alias`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`machine`) REFERENCES `machines`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`userJHED`) REFERENCES `users`(`JHED`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `userBudgetRelation` (
	`relationId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` integer,
	`budgetId` integer,
	FOREIGN KEY (`userId`) REFERENCES `users`(`jid`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`budgetId`) REFERENCES `budgetCodes`(`budgetCode`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `userMachineRelation` (
	`relationId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` integer,
	`machineId` integer,
	FOREIGN KEY (`userId`) REFERENCES `users`(`jid`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`machineId`) REFERENCES `machines`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`jid` integer PRIMARY KEY NOT NULL,
	`first name` text NOT NULL,
	`last name` text NOT NULL,
	`banned` integer NOT NULL,
	`admin` integer NOT NULL,
	`JHED` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `budgetCodes_alias_unique` ON `budgetCodes` (`alias`);--> statement-breakpoint
CREATE UNIQUE INDEX `machines_name_unique` ON `machines` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_JHED_unique` ON `users` (`JHED`);
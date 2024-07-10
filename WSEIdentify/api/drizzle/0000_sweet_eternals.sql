CREATE TABLE `budgetCharges` (
	`timeSpent` integer NOT NULL,
	`bCode` integer,
	`machine` integer NOT NULL,
	`userJid` integer,
	FOREIGN KEY (`bCode`) REFERENCES `budgetCodes`(`budgetCode`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`userJid`) REFERENCES `users`(`jid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `budgetCodes` (
	`budgetCode` integer PRIMARY KEY NOT NULL,
	`alias` text,
	`isSeniorDesign` integer DEFAULT 0,
	`isLab` integer DEFAULT 0,
	`isClass` integer DEFAULT 1
);
--> statement-breakpoint
CREATE TABLE `machines` (
	`name` text PRIMARY KEY NOT NULL,
	`hourly rate` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`jid` integer PRIMARY KEY NOT NULL,
	`first name` text NOT NULL,
	`last name` text NOT NULL,
	`machine permissions` integer NOT NULL,
	`banned` integer NOT NULL,
	`budgetAliases` text,
	`admin` integer NOT NULL
);

ALTER TABLE `posts` RENAME TO `users`;--> statement-breakpoint
ALTER TABLE `users` ADD `admin` integer NOT NULL;
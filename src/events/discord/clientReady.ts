/**
 * Credits: The OpenUwU Project
 * Owners: @priyanshu @prayag
 * Author:  @bre4d777 and @mooncarli
 * github.com/openUwU/
 */

import { defineEvent } from "../../types/index.js";
import { startCrons } from "../../utils/crons/index.js";
import { logger } from "../../utils/logger.js";

export default defineEvent({
	name: "clientReady",
	once: true,
	async execute(client) {
		if (!client.user) return;
		logger.success("Bot", `Logged in as ${client.user.tag}`);

		const isPrimaryProcess = !client.cluster || client.cluster.id === 0;
		if (!isPrimaryProcess) return;

		try {
			await client.commands.registerSlashCommands();
		} catch (error) {
			logger.error("Bot", "Failed to register slash commands", error as Error);
		}

		setTimeout(() => startCrons(client), 60_000);
	},
});

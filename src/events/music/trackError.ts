/**
 * Credits: The OpenUwU Project
 * Owners: @priyanshu @prayag
 * Author:  @bre4d777 and @mooncarli
 * github.com/openUwU/
 */

import { defineMusicEvent } from "../../structures/music/index.js";
import { logger } from "../../utils/logger.js";
import { deleteNowPlaying, sendTrackError } from "../../utils/playerMessages.js";

export default defineMusicEvent({
	name: "trackError",
	async execute(client, player, track, exception, snapshot) {
		logger.error(
			"Music",
			`[${snapshot.guildId}] Track error: "${track.info.title}" | ${exception.severity}: ${exception.message}`,
		);

		await deleteNowPlaying(player, client);
		await sendTrackError(player, client);
	},
});

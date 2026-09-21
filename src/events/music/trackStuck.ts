/**
 * Credits: The OpenUwU Project
 * Owners: @priyanshu @prayag
 * Author:  @bre4d777 and @mooncarli
 * github.com/openUwU/
 */

import { defineMusicEvent } from "../../structures/music/index.js";
import { logger } from "../../utils/logger.js";
import { deleteNowPlaying, sendTrackStuck } from "../../utils/playerMessages.js";

export default defineMusicEvent({
	name: "trackStuck",
	async execute(client, player, track, snapshot) {
		logger.warn(
			"Music",
			`[${snapshot.guildId}] Track stuck: "${track.info.title}" — auto-skipping`,
		);

		await deleteNowPlaying(player, client);
		await sendTrackStuck(player, client);
	},
});

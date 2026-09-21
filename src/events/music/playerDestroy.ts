/**
 * Credits: The OpenUwU Project
 * Owners: @priyanshu @prayag
 * Author:  @bre4d777 and @mooncarli
 * github.com/openUwU/
 */

import { defineMusicEvent } from "../../structures/music/index.js";
import { clearPlayerSnapshot } from "../../structures/music/persistence.js";
import { logger } from "../../utils/logger.js";

export default defineMusicEvent({
	name: "playerDestroy",
	async execute(_client, player, snapshot) {
		logger.debug(
			"Music",
			`[${snapshot.guildId}] Player destroyed | lastTrack="${snapshot.currentTrack?.info.title ?? "none"}"`,
		);
		void player;
		await clearPlayerSnapshot(snapshot.guildId);
	},
});

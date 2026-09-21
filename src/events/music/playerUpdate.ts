/**
 * Credits: The OpenUwU Project
 * Author:  @bre4d777 and @mooncarli
 * github.com/openUwU/
 *
 */

import { defineMusicEvent } from "../../structures/music/index.js";
import { savePlayerSnapshot } from "../../structures/music/persistence.js";

export default defineMusicEvent({
	name: "playerUpdate",
	async execute(_client, player) {
		if (!player.hasCurrentTrack) return;
		await savePlayerSnapshot(player);
	},
});

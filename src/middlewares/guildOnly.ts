/**
 * Credits: The OpenUwU Project
 * Owners: @priyanshu @prayag
 * Author:  @bre4d777 and @mooncarli
 * github.com/openUwU/
 */

import type { MiddlewareFn } from "../types/index.js";
import { fail, ok, withLabel } from "../types/index.js";

export function guildOnly(): MiddlewareFn {
	return withLabel("Server Only", (ctx) => {
		if (!ctx.guild) {
			return fail("Server Only", "This command can only be used inside a server.");
		}
		return ok();
	});
}

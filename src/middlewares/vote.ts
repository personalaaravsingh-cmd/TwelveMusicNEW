/**
 * Credits: The OpenUwU Project
 * Owners: @priyanshu @prayag
 * Author:  @bre4d777 and @mooncarli
 * github.com/openUwU/
 */

import { hasVotedRecently } from "../db/stores/votes.js";
import { premiumService } from "../services/premium.js";
import type { MiddlewareFn } from "../types/index.js";
import { fail, ok, withLabel } from "../types/index.js";

export function voteRequired(): MiddlewareFn {
	return withLabel("Vote Required", async (ctx) => {
		const voted =
			(await hasVotedRecently(ctx.member.id)) ||
			(await premiumService.hasAnyPremium(ctx.guild.id, ctx.user.id));
		if (voted) return ok();

		return fail(
			"Vote Required",
			"This command requires an active vote. Vote on Top.gg and try again - \n https://top.gg/bot/1277525844319014955",
		);
	});
}

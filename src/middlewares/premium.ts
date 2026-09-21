/**
 * Credits: The OpenUwU Project
 * Owners: @priyanshu @prayag
 * Author:  @bre4d777 and @mooncarli
 * github.com/openUwU/
 */

import { premiumService } from "../services/premium.js";
import type { MiddlewareFn } from "../types/index.js";
import { fail, ok, withLabel } from "../types/index.js";

const SCOPE_LABELS: Readonly<Record<"user" | "server" | "any", string>> = {
	user: "User Premium",
	server: "Server Premium",
	any: "Premium",
};

export function premiumRequired(scope: "user" | "server" | "any"): MiddlewareFn {
	return withLabel(SCOPE_LABELS[scope], async (ctx) => {
		const userId = ctx.member.id;
		const guildId = ctx.guild.id;

		let hasPremium: boolean;
		if (scope === "user") {
			hasPremium = await premiumService.hasUserPremium(userId);
		} else if (scope === "server") {
			hasPremium = await premiumService.hasServerPremium(guildId);
		} else {
			hasPremium = await premiumService.hasAnyPremium(guildId, userId);
		}

		if (hasPremium) return ok();

		return fail(
			"Premium Required",
			"This command requires premium. Use the premium command to view plans and activate.",
		);
	});
}

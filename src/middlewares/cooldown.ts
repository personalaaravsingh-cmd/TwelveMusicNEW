/**
 * Credits: The OpenUwU Project
 * Owners: @priyanshu @prayag
 * Author:  @bre4d777 and @mooncarli
 * github.com/openUwU/
 */

import { getRedis } from "../db/redis.js";
import { premiumService } from "../services/premium.js";
import type { MiddlewareFn } from "../types/middleware.js";
import { fail, ok, withLabel } from "../types/middleware.js";

const PREMIUM_COOLDOWN_MULTIPLIER = 0.55;

function commandKey(name: string | string[]): string {
	return Array.isArray(name) ? name.join("/") : name;
}

function applyPremiumDiscount(seconds: number): number {
	return Math.max(1, Math.round(seconds * PREMIUM_COOLDOWN_MULTIPLIER));
}

export function cooldown(seconds: number): MiddlewareFn {
	return withLabel(`Cooldown: ${seconds}s`, async (ctx, command) => {
		const key = `cooldown:${commandKey(command.name)}:${ctx.user.id}:${ctx.guild.id}`;
		const informedKey = `${key}:informed`;
		const redis = getRedis();
		const results = await redis.pipeline().ttl(key).get(informedKey).exec();

		const ttl = (results?.[0]?.[1] as number | null) ?? -1;
		const alreadyInformed = (results?.[1]?.[1] as string | null) ?? null;

		if (ttl > 0) {
			if (alreadyInformed) {
				return fail("Cooldown", "", { silent: true });
			}
			await redis.setex(informedKey, ttl, "1");

			const timestamp = Math.floor((Date.now() + ttl * 1_000) / 1_000);
			return fail("Cooldown", `You can use this command again <t:${timestamp}:R>.`);
		}

		const isPremium = await premiumService.hasAnyPremium(ctx.guild.id, ctx.user.id);
		const effectiveSeconds = isPremium ? applyPremiumDiscount(seconds) : seconds;

		await redis.setex(key, effectiveSeconds, "1");
		return ok();
	});
}

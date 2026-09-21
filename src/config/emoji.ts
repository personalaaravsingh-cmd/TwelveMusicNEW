/**
 * Credits: The OpenUwU Project
 * Owners: @priyanshu @prayag
 * Author:  @bre4d777 and @mooncarli
 * github.com/openUwU/
 */

const emojiDictionary = {
	artist: "<:artist:1545410784182673580>",
	duration_grey: "<:duration_grey:1545410793460334703>",
	more: "<:more:1545410803686047836>",
	play: "<:play:1545410814654152734>",
	drag_up: "<:drag_up:1545410824082952292>",
	drag_down: "<:drag_down:1545410833910071406>",
	remove: "<:remove:1545410843317899345>",
	left: "<:left:1545410855452020827>",
	right: "<:right:1545410867531878400>",
	requester: "<:requester:1545410880303534120>",
	blank: "<:blank:1545410892684984401>",
	info: "<:info:1545410905058181131>",
	check: "<:check:1545410917078933584>",
	cross: "<:cross:1545410928579706890>",
	track: "<:track:1545410940000927847>",
	pause: "<:pause:1545410951774208012>",
	resume: "<:resume:1545410966701736026>",
	stop: "<:stop:1545410978928140369>",
	skip: "<:skip:1545410995839705169>",
} as const;

/** * Extracted type of valid emoji names based on the dictionary keys.
 */
export type EmojiName = keyof typeof emojiDictionary;

/**
 * The emoji utility object.
 */
export const emoji = {
	/**
	 * Retrieves a  emoji by its name.
	 * * @param name - The key of the emoji defined in `emojiDictionary`.
	 * @returns The Discord formatted emoji string. Returns a fallback "❓" if somehow bypassed.
	 */
	get(name: EmojiName): string {
		return emojiDictionary[name] ?? "❓";
	},
};

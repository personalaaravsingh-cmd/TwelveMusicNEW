/**
 * Credits: The OpenUwU Project
 * Owners: @priyanshu @prayag
 * Author:  @bre4d777 and @mooncarli
 * github.com/openUwU/
 */

import type { PrefixCommandContext } from "./PrefixCommandContext.js";
import type { SlashCommandContext } from "./SlashCommandContext.js";

export type CommandContext = PrefixCommandContext | SlashCommandContext;

export { PrefixCommandContext } from "./PrefixCommandContext.js";
export { SlashCommandContext } from "./SlashCommandContext.js";
export type { ContextReplyOptions } from "./types.js";

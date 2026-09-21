/**
 * Credits: The OpenUwU Project
 * Owners: @priyanshu @prayag
 * Author:  @bre4d777 and @mooncarli
 * github.com/openUwU/
 */

export class AsyncLock {
	private _tail: Promise<unknown> = Promise.resolve();

	public run<T>(fn: () => Promise<T>): Promise<T> {
		const result = this._tail.then(fn, fn);
		this._tail = result.then(
			() => undefined,
			() => undefined,
		);
		return result;
	}
}

export class GenericData<T> {
  constructor(private data: T[], private key: (item: T) => string) {}

  /**
   * Returns a slice from `offset` up to `limit` without filtering.
   */
  lazyLoad(offset: number, limit: number): { total: number; data: T[] } {
    return { total: this.data.length, data: this.data.slice(offset, offset + limit) };
  }

  /**
   * Searches through `data`:
   * - If `startsWith` is true, items must begin with the query.
   * - Otherwise, items that include the query anywhere.
   */
  search(query: string, startsWith = false): T[] {
    const lowerQuery = query.toLowerCase();
    return this.data.filter(item => {
      const val = this.key(item).toLowerCase();
      return startsWith ? val.startsWith(lowerQuery) : val.includes(lowerQuery);
    });
  }

  /**
   * Applies `search`, then returns a slice from `offset` up to `limit`.
   */
  searchLazy(query: string, offset: number, limit: number, startsWith = false): { total: number; data: T[] } {
    const results = this.search(query, startsWith);
    const total = results.length;
    if(total < offset + limit ) return { total: total, data: results };
    return { total: total, data: results.slice(offset, offset + limit) };
  }
}

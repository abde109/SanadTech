// backend/services/GenericData.ts

export class GenericData<T> {
  constructor(
    public data: T[],
    private key: (item: T) => string
  ) {
    
  }

  /**
   * Return a slice of data for [offset, offset + limit].
   */
  lazyLoad(offset: number, limit: number): { total: number; data: T[] } {
    const total = this.data.length;
    const sliced = this.data.slice(offset, offset + limit);
    return { total, data: sliced };
  }

  /**
   * Return the index of the first item whose key starts with the given letter.
   * If none found, return the last index (so we don't break).
   */
  getIndexForLetter(letter: string): number {
    const lowerLetter = letter.toLowerCase();
    const idx = this.data.findIndex(item =>
      this.key(item).toLowerCase().startsWith(lowerLetter)
    );
    return idx >= 0 ? idx : this.data.length - 1;
  }
}

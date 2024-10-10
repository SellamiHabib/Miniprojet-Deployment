class JustifyService {
  private maxLineLength: number;

  constructor() {
    this.maxLineLength = 80;
  }

  public justifyText(text: string): string {
    const words = text.split(/\s+/);
    let lines: string[] = [];
    let currentLine: string[] = [];

    words.forEach((word) => {
      const lineLength = currentLine.join(' ').length;

      if (lineLength + word.length + 1 <= this.maxLineLength) {
        currentLine.push(word);
      } else {
        lines.push(this.justifyLine(currentLine, this.maxLineLength));
        currentLine = [word];
      }
    });

    if (currentLine.length) {
      lines.push(currentLine.join(' ')); // Last line, no need to justify
    }

    return lines.join('\n');
  }

  private justifyLine(words: string[], length: number): string {
    if (words.length === 1) return words[0]; // If only one word, no justification

    const totalSpaces = length - words.join('').length;
    let spacesBetweenWords = Math.floor(totalSpaces / (words.length - 1));
    let extraSpaces = totalSpaces % (words.length - 1);

    return words.reduce((acc, word, idx) => {
      if (idx === words.length - 1) return acc + word; // Last word, no space after
      let spaces = spacesBetweenWords + (extraSpaces > 0 ? 1 : 0);
      extraSpaces--;
      return acc + word + ' '.repeat(spaces);
    }, '');
  }
}

export default new JustifyService();

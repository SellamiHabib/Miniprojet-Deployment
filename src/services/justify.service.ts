class JustifyService {
  private maxLineLength: number;

  constructor(maxLineLength?: number) {
    this.maxLineLength = maxLineLength || 80;
  }

  public justifyText(text: string): string {
    const words = text.split(/\s+/); // Split words by whitespace
    const lines: string[] = [];
    let currentLine: string[] = [];

    let currentLength = 0;

    for (const word of words) {
      if (currentLength + word.length + currentLine.length > this.maxLineLength) {
        lines.push(this.justifyLine(currentLine, this.maxLineLength));
        currentLine = [];
        currentLength = 0;
      }
      currentLine.push(word);
      currentLength += word.length;
    }

    // Handle the last line (left-aligned)
    if (currentLine.length > 0) {
      lines.push(currentLine.join(" "));
    }

    return lines.join('\n');
  }

  private justifyLine(words: string[], lineWidth: number): string {
    if (words.length === 1) return words[0]; // If there's only one word, return it

    const totalSpaces = lineWidth - words.reduce((acc, word) => acc + word.length, 0);
    const spacesBetweenWords = words.length - 1;
    const minSpaces = Math.floor(totalSpaces / spacesBetweenWords);
    const extraSpaces = totalSpaces % spacesBetweenWords;

    let justifiedLine = '';

    for (let i = 0; i < words.length - 1; i++) {
      justifiedLine += words[i] + ' '.repeat(minSpaces + (i < extraSpaces ? 1 : 0));
    }

    justifiedLine += words[words.length - 1]; // Add the last word
    return justifiedLine;
  }
}

export default JustifyService;

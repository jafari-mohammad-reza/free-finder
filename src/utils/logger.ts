function logColoredText(text, colorCode) {
    console.log(`\x1b[${colorCode}m%s\x1b[0m`, text);
}

export function logResult(title, url) {
    logColoredText('Title:', 35); // Purple color
    console.log(title);
    logColoredText('URL:', 32); // Green color
    console.log(url);
    console.log('\n');
}

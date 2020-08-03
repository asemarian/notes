export default function wordCounter(text) {
    return text.split(/\s/).filter(x => x).length;
}
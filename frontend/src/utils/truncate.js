export default function truncate(text, length) {
    console.log(length)
    if (text.length <= length) return text;
    return text.slice(0, length).trim() + "...";
}
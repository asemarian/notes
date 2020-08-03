export default function charCounter(text) {
    return text.replace(/\W/g, "").length;
}
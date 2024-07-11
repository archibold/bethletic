export function getSmallImageUrl(gif_url: string) {
    return (
        gif_url.substring(0, 50) +
        "w_150/q_50/f_auto/" +
        gif_url.substring(50) +
        ".gif"
    );
}

export function capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

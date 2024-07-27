const url = process.env.GIF_URL_PATH || "";
export function getSmallImageUrl(gif_url: string) {
    return (
        url.substring(0, 50) +
        "w_150/q_50/f_auto/" +
        url.substring(50) +
        gif_url
    );
}

export function getImageUrl(gif_url: string | null) {
    return url + gif_url;
}

export function capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

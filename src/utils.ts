// utility functions
export const isValidUrl = (url: string): boolean => {
    const regex: RegExp = /https?:\/\/(www\.)?[-a-zA-Z\d@:%._+~#=]{1,256}\.[a-zA-Z\d()]{1,6}\b([-a-zA-Z\d()@:%_+.~#?&/=]*)/
    return regex.test(url)
}



export function truncateWithEllipses(text: string, max: number) {
    return text.substr(0, max - 1) + (text.length > max ? '&hellip;' : '');
}

export function generateShortLink() {
    const linkLength: number = parseInt(process.env.LINK_LENGTH || '5');
    return Array(linkLength + 1).join((Math.random().toString(36) + '00000000000000000').slice(2, 18)).slice(0, linkLength);
}



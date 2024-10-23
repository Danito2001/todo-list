

export const formattedTitle = (title: string, maxLength: number) => {

    return title.length >= 50 ? title.substring(0, maxLength) + '...' : title;

};
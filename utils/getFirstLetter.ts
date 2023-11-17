export const getFirstLetter = (s : string | undefined) : string => {
    return s ? s.charAt(0).toUpperCase() : 'U'
}
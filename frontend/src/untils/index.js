export const removeAccent = (str) => {
    str = str.trim().replace(/\s\s+/, " ")
    str = str.replace(/[àáâãäå]/, "a")
    str = str.replace(/æ/, "ae")
    str = str.replace(/ç/, "c")
    str = str.replace(/[èéêë]/, "e")
    str = str.replace(/[ìíîï]/, "i")
    str = str.replace(/ñ/, "n")
    str = str.replace(/[òóôõöơờồ]/, "o")
    str = str.replace(/œ/, "oe")
    str = str.replace(/[ùúûü]/, "u")
    str = str.replace(/[ýÿ]/, "y")
    return str.toLowerCase()
}
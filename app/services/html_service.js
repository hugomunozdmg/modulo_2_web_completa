
export async function getHtml(file) {
    const result = await fetch(file)
    return await result.text()
}

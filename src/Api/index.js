const luis = "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/7b70b9a1-39c5-4505-a20a-4e370fc9a064?verbose=true&timezoneOffset=0&subscription-key=a4b7a51b08d74d95bfc580e994c9d69b&q="
const product = "http://127.0.0.1:8000/products?"

const getEntities = async (product) => {
    const res = await fetch(luis + product)
    const data = await res.json()
    console.log(data)
    if (data.entities.length > 2) {
        return {
            keyword: product
        }
    }
    const newKeyword = product.replace(data.entities[0].type, "")
    return {
        category: data.entities[0] === undefined ? "" : data.entities[0].entity,
        keyword: newKeyword
    }
}
export const getProducts = async (sentance, isUsed, priceStart, priceEnd) => {
    const data = await getEntities(sentance)
    const q = `keyword=${data.keyword}&isUsed=${isUsed}&priceStart=${priceStart}&priceEnd=${priceEnd}&category=${data.category}`
    const request = product + q.toString()
    let products
    try {
        products = await fetch(request)
    } catch {
        console.log("Error find a way to resolve")
    }
    const d = await products.json()
    return d
}

// getProducts("i want to buy a good iphone", false, 0, 5000)
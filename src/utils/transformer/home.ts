
export const HomeTransformer = (data) =>{
    const homeProductCarousel=data.psdata.featuredProductsList.map((product)=>{
        return{
            id:product.id_product,
            name:product.name,
            price:product.price,
            image:product.cover.url,
            disconnect:product.discount_amount,
            quantity:product.quantity,
            rate:product.rate
        }
    })
    
    return{
        homeProductCarousel
    }
}
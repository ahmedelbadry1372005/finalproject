export interface ProductType {
    _id: string,
    title: string,
    imageCover: string,
    price: number,
    ratingsAverage: number,
    category: { name: string },
    brand: { name: string },
}

export interface CategoryType {
    _id: string,
    name: string,
    image: string,
    slug: string,
}

export interface BrandType {
    _id: string,
    name: string,
    image: string,
    slug: string,
}
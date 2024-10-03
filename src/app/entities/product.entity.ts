export interface ProductHttp {
    id: number;
    title: string;
    price: number;
    description: string;
    category: {
      id: number;
      name: string;
      image: string;
    };
    images: string[];  // Array of image URLs from the API
  }

  export interface Category {
    id: number;
    name: string;
    image: string;
  }
  
  
  export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: Category;
    image: string;  // Single image instead of an array
  }

  export namespace Product {
    export function fromHttp(productHttp: ProductHttp):Product {
        return {
            id: productHttp.id,
            title: productHttp.title,
            price: productHttp.price,
            description: productHttp.description,
            category:{
                id:productHttp.category.id,
                name:productHttp.category.name,
                image:productHttp.category.image
            },
            image:productHttp.images[0]
        }
    }
  }
  
  

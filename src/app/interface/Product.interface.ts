interface Product {
    id: number,
    name: string,
    description: string,
    price: number,
    entry_date: Date,
    category: Category
  }
  
  interface Category{
    idCategory: number,
    name:string
  }
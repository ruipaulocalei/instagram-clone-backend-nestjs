import { ProductModel } from "src/models/product.model";
import { CreateProductDtoInput, CreateProductDtoOutput } from "./dtos/create-product.dto";
import { ProductService } from "./product.service";
export declare class ProductResolver {
    private readonly productService;
    constructor(productService: ProductService);
    createProduct(data: CreateProductDtoInput): Promise<CreateProductDtoOutput>;
    products(): Promise<ProductModel[]>;
}

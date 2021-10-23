import { PrismaService } from '../prisma.service';
import { CreateProductDtoInput, CreateProductDtoOutput } from './dtos/create-product.dto';
import { ProductModel } from 'src/models/product.model';
export declare class ProductService {
    private prisma;
    constructor(prisma: PrismaService);
    createProduct({ name }: CreateProductDtoInput): Promise<CreateProductDtoOutput>;
    products(): Promise<ProductModel[]>;
}

import { OutputDto } from "src/common/dtos/output.dto";
import { ProductModel } from "src/models/product.model";
declare const CreateProductDtoInput_base: import("@nestjs/common").Type<Pick<ProductModel, "name">>;
export declare class CreateProductDtoInput extends CreateProductDtoInput_base {
}
export declare class CreateProductDtoOutput extends OutputDto {
}
export {};

import { PartialType } from "@nestjs/mapped-types";
import { CreateAddressBookDto } from "@src/ecom/address-book/dto/create-address-book.dto";

export class UpdateAddressBookDto extends PartialType(CreateAddressBookDto) {}

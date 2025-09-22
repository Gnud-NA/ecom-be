import { PartialType } from "@nestjs/swagger";
import { CreateWalletDto } from "@src/ecom/wallet/dto/create-wallet.dto";

export class UpdateWalletDto extends PartialType(CreateWalletDto) {}

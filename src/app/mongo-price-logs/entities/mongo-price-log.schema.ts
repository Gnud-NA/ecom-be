import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as mSchema } from "mongoose";

export type MongoPriceLogDocument = HydratedDocument<MongoPriceLog>;

@Schema()
export class MongoPriceLog {
  @Prop({ type: mSchema.Types.String })
  symbol: string;

  @Prop({ type: mSchema.Types.Number })
  minPrice: number;

  @Prop({ type: mSchema.Types.Number })
  maxPrice: number;

  @Prop()
  createdAt: string;
}

export const MongoPriceLogSchema = SchemaFactory.createForClass(MongoPriceLog);

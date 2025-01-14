import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: false })
export class User {
  @Prop({
    type: String,
    required: [true, 'Login not provided'],
    unique: false,
  })
  login!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

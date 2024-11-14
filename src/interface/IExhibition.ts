import {IUser} from "./IUser";

export interface IExhibition {
    commentCount: number;
    createdAt: Date;
    description: string;
    id: number;
    imageUrl: string;
    user: IUser
}
export class Post {
    id!: number;
    title!: string;
    description!: string;
    imageUrl!: string;
    createdDate!: Date;
    likes!: number;
    location?: string;
}
export class Post {
    id!: number;
    createdDate!: Date;
    title!: string;
    imageUrl!: string;
    location?: string;
    description!: string;
    likes!: number;
    dislikes!: number;
    usersLiked!: string[];
    usersDisliked!: string[];
    userId!: string;
}
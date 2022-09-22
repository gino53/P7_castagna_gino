export class Post {

    public _id!: string;
    public createdDate!: Date;
    public title!: string;
    public imageUrl!: string;
    public location?: string;
    public description!: string;
    public likes!: number;
    public dislikes!: number;
    public usersLiked!: string[];
    public usersDisliked!: string[];
    public userId!: string;

}
export class Post {

    public id!: number;
    public createdDate!: Date;
    public title!: string;
    public image?: string;
    public imageUrl?: string;
    public location?: string;
    public description!: string;
    public likes!: number;
    public dislikes!: number;
    public usersLiked!: string[];
    public usersDisliked!: string[];
    public userId!: string;

}
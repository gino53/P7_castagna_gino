export class Post {
    constructor(public title: string,
        public description: string,
        public imageUrl: string,
        public createdDate: Date,
        public like: number) {
    }
}
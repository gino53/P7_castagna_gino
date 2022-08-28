export class Post {
    constructor(public title: string,
        public imageUrl: string,
        public createdDate: Date,
        public description: string,
        public like: number) {
    }
}
export interface IPost {
    content: string;
    visibility: 'public' | 'private';
    // likes: Array<Like>;
    // comments: Array<Comment>
    created_at: Date;
    updated_at: Date | null;
};

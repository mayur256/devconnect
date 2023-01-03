type Like = {
    created_at: Date;
}

type Comment = {
    created_at: Date;
    updated_at: Date | null;
}

export interface IPost {
    content: string;
    attachments: Array<string>;
    visibility: 'public' | 'private';
    likes: Array<Like>;
    comments: Array<Comment>
    created_at: Date;
    updated_at: Date | null;
};

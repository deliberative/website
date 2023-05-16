export interface IBlogPost {
  title: string;
  date: string;
  path: string;
}

export interface IBlogPosts {
  blogposts: [IBlogPost];
}

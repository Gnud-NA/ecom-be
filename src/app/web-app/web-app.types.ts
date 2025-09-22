import Category from "@src/app/categories/entities/category.entity";
import Post from "@src/app/posts/entities/post.entity";
import EcomCategory from "@src/ecom/ecom-categories/entities/ecom-category.entity";
import Product from "@src/ecom/product/entities/product.entity";

export interface IDetails {
    ecomCategories?: EcomCategory[];
    products?: Product[];
    post?: Post;
    category?: Category;
    page?: Post;
    posts?: Post[];
    totalPosts?: number;
}

export interface IAllSlug {
    ecomCategories?: EcomCategory[];
    products?: Product[];
    categories?: Category[];
    posts?: Post[];
    pages?: Post[];
}

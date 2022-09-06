import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

// mdファイルからデータを取り出す
export function getPostsData() {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, "");

        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        const matterReault = matter(fileContents);
        return {
            id,
            ...matterReault.data,
        };
    });
    return allPostsData
}

// getStaticPathでreturnで使うpathを取得する
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ""),
            },
        }
    });
}

// idに基づいてブログ投稿データを返すための関数
export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContent = fs.readFileSync(fullPath, "utf8");

    const matterReault = matter(fileContent);

    const blogContent = await remark().use(html).process(matterReault.content);
    const blogContentHTML = blogContent.toString();
    return {
        id,
        blogContentHTML,
        ...matterReault.data,
    };
   
}
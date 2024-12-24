import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'app', 'data'); // 读取存储文章的目录

// 获取所有文章
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tagFilter = searchParams.get('tag'); // 获取标签过滤条件
  const dateFilter = searchParams.get('date'); // 获取日期过滤条件

  // 读取目录下所有文件
  const fileNames = fs.readdirSync(postsDirectory);

  // 解析所有文章
  const posts = fileNames.map((fileName) => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: fileName.replace(/\.md$/, ''),
      ...data, // 包括 title, date, tags 等元数据
      content,
    };
  });

  // 根据 tagFilter 过滤文章
  let filteredPosts = posts;
  if (tagFilter) {
    filteredPosts = filteredPosts.filter(
      (post) => post.tags && post.tags.includes(tagFilter)
    );
  }

  // 根据 dateFilter 过滤文章
  if (dateFilter) {
    filteredPosts = filteredPosts.filter((post) => {
      const postDate = post.date as string;

      // 处理年份过滤（YYYY）
      if (dateFilter.length === 4) {
        return postDate.startsWith(dateFilter); // 只匹配年份部分
      }

      // 处理年月过滤（YYYY-MM）
      if (dateFilter.length === 7) {
        return postDate.startsWith(dateFilter); // 匹配年月部分
      }

      // 如果格式不正确，返回 false
      return false;
    });
  }

  // 返回过滤后的文章
  return NextResponse.json(filteredPosts);
}

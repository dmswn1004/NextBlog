import fs from 'fs';
import path from 'path';
import { GetStaticProps } from 'next';
import matter from 'gray-matter';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { Post, PostListProps } from "../components/PostList"
import PostList from '../components/PostList';

export const getStaticProps: GetStaticProps<PostListProps> = async () => {
  const postsDirectory = path.join(process.cwd(), '__posts');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      id: filename.replace(/\.md$/, ''),
      title: data.title,
      img: data.img,
      tag: data.tag,
      date: data.date
    };
  });
  return {
    props: {
      posts,
    },
  };
};

const ListPage: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div>
      <Header/>
        <PostList posts={posts} />
      <Footer/>
    </div>
  );
};

export default ListPage;

import fs from 'fs';
import path from 'path';
import { GetServerSideProps } from 'next';
import matter from 'gray-matter';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { Post, PostListProps } from "../components/PostList"
import PostList from '../components/PostList';
import styled from "styled-components";
import Pagination from '@mui/material/Pagination';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps<PostListProps> = async (context) => {
  const postsDirectory = path.join(process.cwd(), '__posts');
  const filenames = fs.readdirSync(postsDirectory);

  const limit = 5;
  const currentPage = context.query.page ? parseInt(context.query.page as string, 10) : 1;
  const offset = (currentPage - 1) * limit;

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      id: filename.replace(/\.md$/, ''),
      title: data.title,
      tag: data.tag,
      date: data.date
    };
  });

  const totalPosts = posts.length;
  const totalPage = Math.ceil(totalPosts / limit);
  const currentPosts = posts.slice(offset, offset + limit);

  return {
    props: {
      posts: currentPosts,
      totalPage,
      currentPage,
    },
  };
};

const ListPage: React.FC<PostListProps> = ({ posts, totalPage, currentPage }) => {
  const router = useRouter();
  return (
    <div>
      <Header/>
        <Form>
          <Bar>
            <span>NextBlog</span>
          </Bar>
          <PostList posts={posts} totalPage={totalPage} currentPage={currentPage}/>
          <Tab>
            <Pagination 
              count={totalPage}
              onChange={(_, page) => {
                router.push(`/?page=${page}`);
              }}
            />
          </Tab>
        </Form>
      <Footer/>
    </div>
  );
};

const Form = styled.div`
  display: box;
  width: 720px;
  margin: auto;
  text-align: center;
`

const Bar = styled.div`
  align-items: center;
  padding-bottom: 1rem;
  font-family: 'omyu_pretty';
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`

const Tab = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  align-items: center;
  margin: auto;
  padding-top: 1rem;
`

export default ListPage;

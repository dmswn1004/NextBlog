import fs from 'fs';
import path from 'path';
import { GetStaticProps, GetStaticPaths } from 'next';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { styled } from "styled-components"

interface PostData {
    title: string;
    content: string;
}

interface DetailProps {
    post: PostData;
}
  
export const getStaticPaths: GetStaticPaths = async () => {
    const postsDirectory = path.join(process.cwd(), '__posts');
    const filenames = fs.readdirSync(postsDirectory);
  
    const paths = filenames.map((filename) => ({
        params: { id: filename.replace(/\.md$/, '') },
    }));
  
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<DetailProps> = async ({ params }) => {
    const { id } = params;
    const filePath = path.join(process.cwd(), '__posts', `${id}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
  
    const processedContent = await remark().use(html as any).process(content);
    const contentHtml = processedContent.toString();
  
    return {
        props: {
            post: {
            title: data.title,
            content: contentHtml,
            },
        },
    };
};
  
const DetailPage: React.FC<DetailProps> = ({ post }) => {
    return (
        <div>
            <Header/>
                <Box>
                    <PostDetail>
                        <h1>{post.title}</h1>
                        <Content dangerouslySetInnerHTML={{ __html: post.content }} />
                    </PostDetail>
                </Box>
            <Footer/>
        </div>
    );
};

const Box = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 0;
    text-decoration: none;
`

const PostDetail = styled.div`
    width: 30.25rem;
    height: 30.25rem;
    text-align: center;
    padding: 2rem 2rem;
    border-radius: 1.25rem;
    background: rgba(217, 217, 217, 0.13);
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.20);
`

const Content = styled.div`
    text-decoration: none;
`

export default DetailPage;
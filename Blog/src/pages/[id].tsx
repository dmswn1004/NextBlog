import fs from 'fs';
import path from 'path';
import { GetStaticProps, GetStaticPaths } from 'next';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import styled from "styled-components"
import prism from 'remark-prism';

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
  

    const processedContent = await remark().use(html).use(prism).process(content);
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
                    <PostTItle>
                        {post.title}
                    </PostTItle>
                    <Content dangerouslySetInnerHTML={{ __html: post.content }} />
                </Box>
            <Footer/>
        </div>
    );
};

const Box = styled.div`
    width: 720px;
    display: box;
    margin: auto;
    padding: 0.5rem 0;
    font-family: 'omyu_pretty';
`

const PostTItle = styled.div`
    padding-bottom: 2rem;
    text-align: center;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`

const Content = styled.div`
    padding: 1rem 1rem;
    text-align: left;

    pre {
        padding: 1rem 1rem; 
        background-color: #282c34; 
        border-radius: 8px;
        overflow-x: auto; // 긴 코드 라인에 대한 스크롤
      }
    
      code {
        color: white;
      }
    
      .token.string {
        color: #98c379;
      }
`;

export default DetailPage;
import styled from 'styled-components';
import Link from 'next/link';

export interface Post {
    id: string;
    title: string;
    img: string;
    tag: string[];
    date: string;
}
  
export interface PostListProps {
    posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <Form>
      <div>
        {posts.map((post) => (
          <Link href={`/${post.id}`}>
            <PostItem key={post.id}>
              <Div>
                <PostTitle>{post.title}</PostTitle>
                <PostDate>{post.date}</PostDate>
              </Div>
              {post.tag.map((tag) => (
                <TagBox><TagForm>{tag}</TagForm></TagBox>
              ))}
              <LineForm><Line/></LineForm>
            </PostItem>
          </Link>
        ))}
      </div>
    </Form>
  );
};

const Form = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 0.5rem;
  text-align: left;
`

const LineForm = styled.div`
  padding-top: 20px;
`

const Line = styled.div`
  width: 50rem;
  height: 1px;
  background: #EAEAEA;
`

const PostItem = styled.div`
  padding-bottom: 0.5rem;
`;

const Div = styled.div`
  padding: 1rem 0;
  padding-left: 0.5rem;
`

const PostTitle = styled.span`
  color: #000;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const PostDate = styled.span`
  padding-left: 14px;
  font-size: 1rem;
`

const TagBox = styled.div`
  display: inline;
  padding: 0.25rem;
`

const TagForm = styled.span`
  padding: 0.125rem 0.5rem;
  border: 2px solid #61DAFB;;
  border-radius: 1.25rem;
`

export default PostList;
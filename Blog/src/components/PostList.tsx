import styled from 'styled-components';
import Link from 'next/link';

export interface Post {
    id: string;
    title: string;
    tag: string[];
    date: string;
}
  
export interface PostListProps {
    posts: Post[];
    totalPage: number;
    currentPage: number;
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
      <div>
        {posts.map((post) => (
          <Link href={`/${post.id}`}>
            <PostItem key={post.id}>
              <Div>
                <PostTitle>{post.title}</PostTitle>
                <PostDate>{post.date}</PostDate>
              </Div>
              <Tag>
                {post.tag.map((tag) => (
                  <TagBox><TagForm>{tag}</TagForm></TagBox>
                ))}
              </Tag>
              <LineForm><Line/></LineForm>
            </PostItem>
          </Link>
        ))}
      </div>
  );
};

const PostItem = styled.div`
  width: 720px;
  text-align: left;
  font-family: 'omyu_pretty';

  &:hover {
    background:  #EAEAEA;
  }
`;

const Div = styled.div`
  padding: 1rem 1.5rem;
`

const PostTitle = styled.span`
  color: var(--color);
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const PostDate = styled.span`
  padding-left: 20px;
  font-size: 1rem;
`

const Tag = styled.div`
  padding: 0 1rem;
`

const TagBox = styled.div`
  display: inline;
  padding: 0.25rem;
`

const TagForm = styled.span`
  padding: 0.125rem 0.5rem;
  border: 2px solid #61DAFB;
  border-radius: 1.25rem;
`

const LineForm = styled.div`
  padding-top: 20px;
`

const Line = styled.div`
  width: 720px;;
  height: 1px;
  background: #EAEAEA;
`

export default PostList;
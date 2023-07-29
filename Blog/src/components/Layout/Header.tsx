import styled from "styled-components"
import Link from 'next/link';

const Header = () => {
    return (
        <Head>
            <h1>MyBlog</h1>
            <Menu>
                <Menus><Link href={`/`}>Home</Link></Menus>
                <Menus>Tags</Menus>
            </Menu>
        </Head>
    )
}

const Head = styled.div`
    // position: fixed;
    width: 100%;
    display: flex;
    top: 0;
    padding: 0 2rem;
    justify-content: space-between;
    align-items: center;
    background: white;
    box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.1);
    color: black;
`;

const Menu = styled.div`
    color: rgba(0, 0, 0, 0.3);
    font-weight: 500;
`

const Menus = styled.span`
    padding: 0 0.5rem;
`

export default Header;
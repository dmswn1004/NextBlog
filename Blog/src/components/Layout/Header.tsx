import { useRouter } from 'next/router';
import styled from "styled-components"
import Link from 'next/link';
import { BsArrowLeft } from "react-icons/bs";

const Header = () => {
    const router = useRouter();

    const goBack = () => {
        if(router.asPath !== router.route) router.back();
        else alert(" 마지막 페이지 입니다. ")
    };
    return (
        <Head>
            <BsArrowLeft
                onClick={goBack}
                size={20}
                style={{
                    color: 'var(--color)',
                    cursor: 'pointer',
                    strokeWidth: 1 // 두께
                }}
                onMouseOver={e => e.currentTarget.style.color = '#61DAFB'}
                onMouseOut={e => e.currentTarget.style.color = 'var(--color)'}
            />
        </Head>
    )
}

const Head = styled.div`
    width: 100%;
    top: 0;
    padding: 1rem 2rem;
    color: black;
`;

export default Header;
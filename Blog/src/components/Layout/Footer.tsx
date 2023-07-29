import { styled } from "styled-components"

const Footer = () => {
    return (
        <End>
            <span>Copyright © MyBolg Corp. All rights reserved.</span>
        </End>
    )
}

const End = styled.div`
    align-items: center;
    justify-content: center;
    bottom: 0;
    width: 100%;
    text-align: center;
    padding: 0.5rem;
`;

export default Footer;
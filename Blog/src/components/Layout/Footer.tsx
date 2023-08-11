import styled from "styled-components"

const Footer = () => {
    return (
        <End>
            <span>Copyright ©NextBolg Corp. All rights reserved.</span>
        </End>
    )
}

const End = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 0;
    width: 100%;
    text-align: center;
    padding: 0.5rem;
    font-size: 13px;
`;

export default Footer;
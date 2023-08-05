import { useTheme } from "next-themes";
import styled from "styled-components";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

export function useToggleTheme() {
    const { theme, setTheme } = useTheme();

    const changeTheme = () => {
        setTheme(theme === 'dark'? 'light' : 'dark');
    }
    return { theme, changeTheme };
}


const ThemeToggleButton: React.FC = () => {
    const { theme, changeTheme } = useToggleTheme();
  
    return (
        <ModeBtn onClick={changeTheme}>
            {
                theme == 'dark'? 
                    <BsSunFill
                        size={26}
                        style={{ color: 'red'}}
                    /> : 
                    <BsMoonFill 
                        size={26}
                        style={{ color: '#fbfb2d'}}
                    />
            } 
        </ModeBtn>
    );
};

const ModeBtn = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    right: 20px;
    bottom: 20px;
    padding: 14px;
    box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.15);
    border-radius: 10rem;
    cursor: pointer;
    background: var(--btn);
`

export default ThemeToggleButton;
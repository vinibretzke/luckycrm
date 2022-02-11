import styled from "styled-components";

export const Container = styled.div`
    position: absolute;
    width: calc(100% - 270px);
    height: calc(100vh - 60px);
    bottom: 0;
    right: 0;
    z-index: 10;

`

export const SenhaContainer = styled.div`    
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        height: 100%;
        width: 100%;
             

        form {
            z-index: 10;
        }
        h1 {
                font-size: 1.5rem;
                font-family: 'Open Sans', sans-serif;
                font-weight: 500;
                margin-bottom: 20px;
            }
        
            input {
                width: 300px;
                height: 40px;
                border-radius: 5px;
                border: 1px solid grey;
                margin: 10px;
                padding: 10px;
            }

            button {
                
                width: 300px;
                height: 40px;
                border-radius: 5px;
                border: 1px solid grey;
                margin-top: 10px;
                background: #00a8ff;
                color: #fff;
                font-weight: normal;
                font-size: 1rem;
                font-family: 'Open Sans', sans-serif;

            }
        
    
        
    `
import styled from 'styled-components'

export const Container = styled.div ` 
    width: 100%;
    height: 100vh;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const Login = styled.div ` 
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 400px;
    height: 450px;

 img {
     margin-bottom: 30px;
 }
 input{
    width: 300px;
    height: 30px;
    border: 2px solid #BEB09C;
    border-radius: 8px;
    font-family: 'Open Sans', sans-serif;
    font-size: 18px;
    text-align: center;
    margin-top: 15px;
 }

 a {
     margin-top: 15px;
 }
 
`

export const ContainerButtons = styled.div `
    padding-top: 30px;
    width: 260px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
button {
    font-family: 'Poppins', sans-serif;
    width: 110px;
    height: 30px;
    border-radius: 4px;
    
    font-weight: 600;
}
.btn-login {
     color: #FFFFFF;
     background-color: #A66741;
     border: 0px;
     
   
     
 }
 .btn-create-account {
    color: #000;
     background-color: #FFFFFF;
     border: 1px solid #000;
 }

 button:hover{
     cursor: pointer;
     opacity: 0.8;
 }
` 
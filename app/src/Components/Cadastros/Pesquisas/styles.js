import styled from "styled-components";

export const Container = styled.div`
    position: absolute;
    width: calc(100% - 270px);
    height: calc(100vh - 60px);
    bottom: 0;
    right: 0;


    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left: 10px;
        padding-top: 10px;
    
        h1 {
            font-size: 18px;
            font-weight: bold;
            color: #333;

    }
}

    
    
`
export const FormContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    height: 80px;
    width: 100%;
    border-bottom: 1px solid #000;
    z-index: 1;
    display: flex;

    form {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr; 
        width: 30%;
        position: absolute;
        left: 0;
        height: 100%;
    
        

        input {
            width: 200px;
        height: 30px;
        border: 1px solid #000;
        border-radius: 3px;
        padding: 0 10px;
        font-size: 14px;
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 10px;
        color: #000;
        z-index: 1;
        
        
    }

    select {
        width: 300px;
        height: 30px;
        border: 1px solid #000;
        border-radius: 3px;
        padding: 0 10px;
        font-size: 14px;
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 10px;
        color: #000;
        z-index: 1;
    }
    }
    button {
        background: #3485FF;
        border: none;
        border-radius: 5px;
        color: #fff;
        font-size: 14px;
        height: 30px;
        width: 100px;
        margin-top: 10px;
        margin-left: 10px;
        z-index: 1;     
           
    }

    label {
        margin-left: 10px;
        margin-top: 10px;
        padding-top: 5px;
        font-size: 14px;
        width: 120px;
        height: 30px;
        color: #000;
        z-index: 1;
    }

    .checkbox {
        margin-left: 10px;
        margin-top: 15px;
        padding-top: 5px;
        font-size: 14px;
        width: 20px;
        height: 20px;
        color: #000;   
    }
    
    button:hover {
        cursor: pointer;
        opacity: 0.7;
    }
    input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }    
`
export const GridContainer = styled.div`
    position: absolute;
    width: 100%;
    z-index: 1;
    position: absolute;
    top: 140px;
    display: flex;
    flex-direction: row;
    

    .buttonExcluir {
        background: #FF3434;
        color: #fff;
        border: none;
        border-radius: 5px;
        padding: 5px;
        margin-left: 10px;
        cursor: pointer;
        transition: 0.3s;
        &:hover {
            opacity: 0.7;
        }
    }

    .buttonCadastrarPergunta {
        background: #3485FF;
        color: #fff;
        border: none;
        border-radius: 5px;
        padding: 5px;
        margin-left: 10px;
        cursor: pointer;
        transition: 0.3s;
        &:hover {
            opacity: 0.7;
        }
    }

    .gridjs-footer {
        height: 40px;
    }

    .gridjs-summary {
        margin:0;
    }

    .gridjs-pages {
        margin:0;
        position: relative;
        top: -5px;
    } 
    
`


export const ContainerSelect = styled.div`

    display: flex;
    flex-direction: row;
    select {
        width: 200px;
        height: 30px;
        border: 1px solid #000;
        border-radius: 3px;
        padding: 0 10px;
        font-size: 14px;
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 10px;
        color: #000;
        z-index: 1;
    }
    select:hover{
        cursor: pointer
    }
`

export const FormContainerPerguntas = styled.div`    
    width: 800px;
    height: 60%;
    position: absolute;
    right: calc(50% - 265px);
    top: calc(50% - 30%);
    z-index: 1;
    border-radius: 5px;
    padding: 10px;
    background: #fff;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
    display: none;

    i {
        font-size: 22px;
        position: absolute;
        right: 10px;
        transition: all 0.3s;
    }
    i:hover {
        cursor: pointer;
        opacity: 0.7;
    }

    h1{
        font-size: 22px;
        font-family: 'Roboto', sans-serif;
    }

    form {
        display: grid;
        position: absolute;
        top: 50px;
        grid-template-columns: 1fr 1fr;
        width: 600px;
    
    }
    input {
        width: 400px;
        height: 30px;
        border: 1px solid #000;
        border-radius: 3px;
        padding: 0 10px;
        font-size: 14px;
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 10px;
        color: #000;
        z-index: 1;
    }

    select {
        width: 150px;
        height: 30px;
        border: 1px solid #000;
        border-radius: 3px;
        padding: 0 10px;
        font-size: 14px;
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 10px;
        color: #000;
        z-index: 1;
    }

    button {
        background: #3485FF;
        border: none;
        border-radius: 5px;
        color: #fff;
        font-size: 14px;
        height: 30px;
        width: 100px;
        margin-top: 10px;
        margin-left: 10px;
        z-index: 1;
        position: absolute;
        bottom: -40px;
        right: 20px;
        transition: 0.3s;
    }

    button:hover {
        cursor: pointer;
        opacity: 0.7;
    }
`
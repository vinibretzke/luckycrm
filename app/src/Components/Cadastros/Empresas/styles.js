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

export const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
    height: 80px;
    gap: 20px;
    background: rgba(255, 92, 0, 0.2);
    border-bottom: 1px solid #000;
    border-top: 1px solid #000;

    h1 {
        color: #000;
        font-size: 14px;
        position: absolute;
        top: 0;
        z-index: 1;
        margin-left: 10px;
    }

    i{
        margin-bottom: 10px;
        font-size: 32px;
        margin-left: 10px;
        z-index: 1;
    }

    i:hover{
        cursor: pointer;
        opacity: 0.7;
    }

    .add{
        color: #3485FF;
    }
    .edit {
        color: #FF9F34;
    }

    .delete {
        color: #FF3434;
    }
`

export const FormContainer = styled.div`
     position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    height: 100px;
    width: 100%;
    border-bottom: 1px solid #000;
    z-index: 1;
    display: flex;

    form {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
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
    top: 170px;

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

`
import styled from 'styled-components'

export const Container = styled.div` 
    height: 200%;
    bottom: 0;
    width: calc(100% - 270px);
    position: absolute;
    top: 60px;
    right: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const DateTimePickerContainer = styled.div`
    width: 100%;
    height: 60px;
    position: absolute;
    top: 0;
    z-index: 2;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .react-datetime-picker {
        padding: 10px 10px;
    }

    i {
        font-size: 30px;
    }

    i:hover{
        cursor: pointer;
    }
`


export const DataContainer = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 60px;


`

export const CardContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    width: 100%;
    padding-left: 2%;
    gap: 20px;
    height: 20%;
    padding-top: 30px;
    margin-bottom: 30px;
    .card {
    height: 130px;
    width: 83%;
    border: 1px solid grey;
    border-radius: 4px; 
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    align-items: center;
    background: rgba(237, 233, 232, 0.7);
    

    h4 {
        font-size: 1rem;
        font-family: 'Open Sans', sans-serif;
        font-weight: 500;

    }

    h5 {
        font-size: 1.4rem;
        font-family: 'Open Sans', sans-serif;
        font-weight: bold;
    }
     }
`
export const ChartContainer = styled.div` 
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    position: absolute;
    top: 20%;
    gap: 20px;
    width: 100%;
    height: 40%;
    z-index: 1;
    


    div {
        width: 650px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
 }

 

 input{
    width: 300px;
    height: 30px;
    border: 2px solid #A1B2CD;
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

export const ContainerButtons = styled.div`
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
     background-color: #3485FF;
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

export const GridContainer = styled.div`
    height: 20%;
    position: absolute;
    margin-top: 50px;
    top: 60%;
    width: 100%;
    z-index: 1;


    
`


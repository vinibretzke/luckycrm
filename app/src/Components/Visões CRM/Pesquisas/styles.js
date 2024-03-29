import styled from "styled-components";

export const Container = styled.div`
    position: absolute;
    width: calc(100% - 270px);
    height: calc(100vh - 60px);
    bottom: 0;
    right: 0;
`

export const Title = styled.div`
    font-size: 18px;
    font-weight: bold;
    color: #333;
    padding: 10px;
`

export const ContainerSelect = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
    height: 5%;
    width: 100%;
    padding: 10px;
    overflow: hidden;
    position: relative;
    z-index: 1;

    select {
        width: 200px;
        height: 30px;
        border: none;
        background: transparent;
        color: #333;
        font-size: 14px;
        font-weight: normal;
        font-family: 'Open-sans', sans-serif;
        outline: none;
        z-index: 2;
        border: 1px solid #333;
        border-radius: 5px;

    }

    select:hover{
        cursor: pointer
    }

    button {
        background: #3485FF;
        border: none;
        border-radius: 5px;
        color: #fff;
        font-size: 14px;
        height: 30px;
        width: 100px;
        margin-left: 10px;
        z-index: 1;     
        transition: all 0.3s;
           
    }
    button:hover {
        cursor: pointer;
        background: #3485FF;
        border: none;
        opacity: 0.7;
    }

`

export const ChartContainer = styled.div`
     display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    position: absolute;
    gap: 40px;
    width: 100%;
    height: 40%;
    z-index: 100;

    div {
        width: 500px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
 }
`

export const RespostasContainer = styled.div`
    display: flex;
    position: absolute;
    top: 54%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    height: 100%;
    background: green;
`
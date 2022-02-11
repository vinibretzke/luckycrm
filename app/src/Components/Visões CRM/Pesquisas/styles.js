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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
    padding: 10px;
    border: 1px solid #333;
    overflow: hidden;
    position: relative;
    z-index: 1;

    select {
        width: 200px;
        height: 100%;
        border: none;
        background: transparent;
        color: #333;
        font-size: 16px;
        font-weight: bold;
        padding: 10px;
        outline: none;
        z-index: 2;

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
    height: 50%;
    z-index: 100;

    div {
        width: 700px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
 }
`
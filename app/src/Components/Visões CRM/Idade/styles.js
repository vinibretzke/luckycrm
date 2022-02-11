import styled from "styled-components";

export const Container = styled.div`
    position: absolute;
    width: calc(100% - 270px);
    height: calc(100vh - 60px);
    bottom: 0;
    right: 0;
    
`

export const CardsContainer = styled.div`
 
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;


    .card-main {
        background: #fff;
        height: 160px;
        border-radius: 5px;
        border: 1px solid grey;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        margin: 20px;

        .card-title {
            margin-top: 15px;
        }
        h4 {
            font-size: 1rem;
            font-family: 'Open Sans', sans-serif;
            font-weight: 500;
        }

        .ticket-medio {
            font-weight: bold;
            font-size: 1.5rem;
            margin-top: -15px;
        }
        .minor-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 50px;
            background: grey;
            width: 100%;

        h5 {
            color: #fff;
            font-family: 'Open Sans', sans-serif;
            font-weight: 500;
            font-size: 1rem;
        }
        }
    .gr1 {
        background: rgba(54, 162, 235, 1);
    }
    .gr2 {
        background: rgba(255, 206, 86, 1);
    }
    .gr3 {
        background: rgba(75, 192, 192, 1);
    }
    .gr4 {
        background: rgba(153, 102, 255, 1);
    }
    .gr5 {
        background: rgba(255, 159, 64, 1);
    }
    .grt {
        background: green;
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
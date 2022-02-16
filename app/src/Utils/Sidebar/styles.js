import styled from 'styled-components';


export const Container = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
`

export const Header = styled.div`
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: #BEB09C;
    z-index: 1;

  .right_logout {
    width: 150px;
    height: 60px;
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
    align-items: center;  
    right: 0;

    i {
      font-size: 30px;
    }
    
    i:hover{
      cursor: pointer;
    }

    span {
      font-size: 18px;
      font-family: 'Roboto', sans-serif;
    }

    span:hover {
      cursor: pointer;
    }
  }

    img{
      width: 100px;
      margin-left: 20px;
    } 

    img:hover{
      cursor: pointer;
    }

    h1 {
    color: #fff;
    font-size: 22px;
    font-family: 'Gugi', cursive;
    }

`


export const LeftSide = styled.div`
  height: 100%;
  width: 270px;
  background: #A66741;

  
  .nav-links {
    height: 100%;
    padding-top: 10px;
    
      li {
        position: relative;
        list-style: none;
        background: #A66741;
        margin: 5px;
        border-radius: 2px;
      
          i {
            font-size: 22px;
            height: 50px;
            min-width: 78px;
            text-align: center;
            line-height: 50px;
            color: black;
          }

          a {
            display: flex;
            align-items: center;
            text-decoration: none;

              .link_name {
              color: black;
              font-weight: 400;
              font-family: 'Roboto', sans-serif;
              }
          }

          .icon-link {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

        
          .sub-menu {
              padding: 6px 6px 14px 80px;
              margin-top: -1px;
              background: #A66741;
              transition: all 0.4s ease;
              z-index: 100;

              li {
                list-style: none; 
                margin: 5px;
                border-radius: 2px;
                background: #A66741;
                padding: 5px;
                font-size: 14px;
                font-family: 'Roboto', sans-serif;
                color: black;
                text-decoration: none;
                transition: all 0.4s ease;
                cursor: pointer;


                  a {
                    display: flex;
                    align-items: center;
                    text-decoration: none;
                    color: black;
                    font-weight: 400;
                    font-family: 'Roboto', sans-serif;
                  }
                  a:active {
                    color: #fff;
                  }
              }


              .sub-menu-2 {
                padding: 5px;
                margin-left: 5px;
                font-size: 14px;
                font-family: 'Roboto', sans-serif;
                color: black;
                text-decoration: none;
                transition: all 0.4s ease;

               

                li {
                  list-style: none;
                }
          
              }     
              .sub-menu-2:hover {
                  cursor: pointer
                  
                }
   
    }
  }

  
`

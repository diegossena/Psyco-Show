import styled, { createGlobalStyle } from 'styled-components'
import type { TStatus } from 'App'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  gap: 20px;
  height: 100%;
`
export const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 100%;
  border: 1px solid #D0D5DD;
  border-radius: 10px;
  max-width: 400px;
  box-shadow: rgba(16, 24, 40, 0.05) 0px 1px 2px 0px;
  position: relative;
  overflow: hidden;
`
export const HeaderProgress = styled.div`
  position: absolute;
  left: 0;
  height: 100%;
  background-color: rgba(0, 255, 0 , 0.25);
`
interface FooterProps {
  'data-status': TStatus
}
export const Footer = styled.footer<FooterProps>`
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
  padding: 20px;
  padding-right: 40px;
  border-top: 2px solid #eaecf0;
  gap: 30px;
  &[data-status="correct"] {
    color: #079455;
    background-color: #ECFDF3;
    border-color: #ABEFC6;
  }
  &[data-status="incorrect"] {
    color: #D92D20;
    background-color: rgb(255, 223, 224);
    border-color: #fecdca;
  }
  h3 {
    font-weight: 700;
    font-size: 18px;
  }
  p {
    font-size: 16px;
    font-weight: 400;
    line-height: 140%;
  }
`
export const FooterResult = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`
interface FooterButtonProps {
  'data-status': TStatus
}
export const FooterButton = styled.button<FooterButtonProps>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 8px;
  background: linear-gradient(90deg,#9282FA 0%,#6E78F3 100%);
  color: #fff;
  padding: 16px 28px;
  font-size: 18px;
  font-weight: 600;
  transition: 200ms;
  &[data-status="correct"] {
    color: #fff;
    background: #17B26A;
  }
  &[data-status="incorrect"] {
    background: #ff4b4c;
  }
  &:disabled {
    cursor: auto;
    background: #D6BBFB;
    border: 1px solid #E9D7FE;
  }
`
export const Section = styled.section`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 700px;
  max-width: calc(-40px + 100dvw);
  gap: 20px;
  margin: 0 auto;
`
export const Question = styled.h2`
  color: #2d3748;
  font-size: 30px;
  font-weight: 600;
`
export const Options = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
  width: 100%;
`
interface OptionProps {
  'data-status'?: TStatus
}
export const Option = styled.button<OptionProps>`
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 2px solid #EAECF0;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 0px;
  padding: 10px;
  border-radius: 10px;
  gap: 20px;
  transition: 100ms;
  background-color: #fff;
  text-align: left;
  &[data-status="correct"] {
    border-color: #ABEFC6;
    background-color: #ECFDF3;
    box-shadow: rgb(170, 239, 198) 0px 3px 0px;
  }
  &[data-status="select"] {
    background-color: rgb(238, 236, 251);
    border-color: #6e78f3;
    box-shadow: rgba(123, 97, 255, 0.2) 0px 3px 0px;
  }
  &[data-status="incorrect"] {
    background-color: rgb(255, 223, 224);
    border-color: #fecdca;
    box-shadow: rgba(255, 223, 224, 0.2) 0px 3px 0px;
  }
  &:not([data-status]):hover {
    background-color: #F9FAFB;
  }
`
export const Letter = styled.span`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #98A2B3;
  border: 2px solid #EAECF0;
  border-radius: 6px;
  background-color: white;
  flex-shrink: 0;
  button[data-status="correct"] > & {
    border-color: #ABEFC6;
    color: #079455;
  }
  button[data-status="select"] > & {
    border-color: #6e78f3;
    color: #6e78f3;
  }
  button[data-status="incorrect"] > & {
    border-color: #fecdca;
    color: #ff4b4c;
  }
`

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    font-family: Inter, sans-serif;
    box-sizing: border-box;
  }
  html, body, #root {
    height: 100%;
  }
`

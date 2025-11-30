import styled, { createGlobalStyle, keyframes } from 'styled-components'
import type { TStatus } from 'App'
import { TransitionStatus } from 'hooks/useTransition'

export interface CardProps {
  'data-status': TStatus
  'data-transition': TransitionStatus
}
const correct_animation = keyframes`
  0% {
    box-shadow: rgba(0, 255, 100, 0) 0px 0px 12px;
    border: 2px solid rgba(0, 255, 100, 0);
  }
  50% {
    box-shadow: rgba(0, 255, 100, 255) 0px 0px 12px;
    border: 2px solid rgba(0, 255, 100, 255);
  }
  100% {
    box-shadow: rgba(0, 255, 100, 0) 0px 0px 12px;
    border: 2px solid rgba(0, 255, 100, 0);
  }
`
const incorrect_animation = keyframes`
  0% {
    box-shadow: rgba(255, 75, 76, 0) 0px 0px 12px;
    border: 2px solid rgba(255, 75, 76, 0);
  }
  50% {
    box-shadow: rgba(255, 75, 76, 255) 0px 0px 12px;
    border: 2px solid rgba(255, 75, 76, 255);
  }
  100% {
    box-shadow: rgba(255, 75, 76, 0) 0px 0px 12px;
    border: 2px solid rgba(255, 75, 76, 0);
  }
`
export const Card = styled.div<CardProps>`
  z-index: 2;
  position: fixed;
  left: 50%;
  top: 50%;

  width: 280px;
  aspect-ratio: 70 / 120;
  border-radius: 12px;

  transform-style: preserve-3d;
  transition: transform 1s;
  perspective: 1000px;
  
  transform: translateX(-50%) translateY(100%) rotateY(0deg);
  &[data-transition="entering"] {
    transform: translateX(-50%) translateY(-50%) rotateY(0deg);
  }
  &[data-transition="entered"] {
    transform: translateX(-50%) translateY(-50%) rotateY(180deg);
  }
  &[data-transition="exiting"] {
    transition: none;
  }

   & > * {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    backface-visibility: hidden;
    font-size: 20px;
    border-radius: 10px;
    background-size: 100% 100%;
    background-repeat: no-repeat;

    font-weight: 500;
    font-size: 16px;
    color: #fff;
  }
  .front {  
    background-image: url(card-front.png);
  }
  .back {
    padding: 10rem 2.5rem 1.5rem;
    background-image: url(card-back.png);
    transform: rotateY(180deg);
    font-size: 12px;
  }
  &[data-status="correct"] .back {  
    animation: ${correct_animation} 1.5s infinite;
  }
  &[data-status="incorrect"] .back {
    animation: ${incorrect_animation} 1.5s infinite;
  }
  /* &[data-status="correct"] .back {
    border-color: #ABEFC6;
    background-color: #ECFDF3;
    box-shadow: rgb(170, 239, 198) 0px 3px 0px;
  }
  &[data-status="incorrect"] .back {
    color: #D92D20;
    background-color: rgb(255, 223, 224);
    border-color: #fecdca;
  } */
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  gap: 20px;
  height: 100%;

  background-image: url(20230602_neuronios2.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`
export const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
interface HeaderWrapperProps {
  'data-started': boolean
}
export const HeaderWrapper = styled.div<HeaderWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 100%;
  border: 2px solid #D0D5DD;
  border-radius: 10px;
  max-width: 400px;
  box-shadow: rgba(16, 24, 40, 0.05) 0px 1px 2px 0px;
  position: relative;
  overflow: hidden;
  color: #fff;
  font-weight: 500;
  background-color: transparent;
  font-size: 16px;
  &[data-started="false"] {
    cursor: pointer;
  }
`
export const HeaderProgress = styled.div`
  position: absolute;
  left: 0;
  height: 100%;
  background-color: rgba(0, 255, 0 , 0.25);
`
export const Teacher = styled.img`
  position: fixed;
  top: 0;
  left: 0;

`
interface FooterProps {
  'data-status': TStatus
}
export const Footer = styled.footer<FooterProps>`
  z-index: 1;
  background-color: #fff;
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
export const Button = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 8px;
  background: linear-gradient(90deg,#9282FA 0%,#6E78F3 100%);
  color: #fff;
  padding: 16px 28px;
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
  text-align: center;
  color: #fff;
  text-shadow: 1px 1px 2px #000;
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
  font-weight: 500;
  /* &[data-status="correct"] {
    border-color: #ABEFC6;
    background-color: #ECFDF3;
    box-shadow: rgb(170, 239, 198) 0px 3px 0px;
  }
  &[data-status="incorrect"] {
    background-color: rgb(255, 223, 224);
    border-color: #fecdca;
    box-shadow: rgba(255, 223, 224, 0.2) 0px 3px 0px;
  } */
  &[data-status="select"] {
    background-color: rgb(238, 236, 251);
    border-color: #6e78f3;
    box-shadow: rgba(123, 97, 255, 0.2) 0px 3px 0px;
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
  /* button[data-status="correct"] > & {
    border-color: #ABEFC6;
    color: #079455;
  }
  button[data-status="incorrect"] > & {
    border-color: #fecdca;
    color: #ff4b4c;
  } */
  button[data-status="select"] > & {
    border-color: #6e78f3;
    color: #6e78f3;
  }
`
interface CreditsProps {
  'data-transition': TransitionStatus
}
export const Credits = styled.div<CreditsProps>`
  position: fixed;
  top: 0;
  height: 400vh;
  background-color: #000;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #fff;
  text-align: center;
  width: 100%;
  z-index: 2;
  & > * {
    margin: 0 auto;
  }
  h2 {
    font-size: 42px;
  }
  h3 {
    font-size: 32px;
  }
  span {
    font-size: 28px;
  }
  img {
    margin-top: 10rem;
    margin-top: calc(50vh - 100px);
    height: 100px;
  }
  top: 100vh;
  transition: top 60s;
  &[data-transition="entered"] {
    top: -125vh;
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

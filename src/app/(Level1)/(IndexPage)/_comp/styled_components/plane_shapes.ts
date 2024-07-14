import styled, { keyframes } from "styled-components";


const rotateBy = (y: number | string) => keyframes`
    to{
        transform: rotate(${y}deg)
    }
`

const rotateStat = (y: number | string) => keyframes`
    to{
        transform: rotate(${y}deg)
    }
`

const fadeOut = keyframes`
    from{
        opacity: 1
    }
    to{
        opacity: 0
    }
`

export const SemiCircle1 = styled.div <{$score:number, $color:string}>`
    background: ${props => props?.$color};
    width: 50%;
    height: 100%;
    position: absolute;
    transform-origin: 100%;
    z-index: 3;
    animation: ${props => rotateBy(props.$score > 5 ? 180 : props.$score * 36)} 2.5s linear forwards
`

export const SemiCircle2 = styled.div <{$score:number, $color:string}>`
    background: ${props => props?.$color};
    width: 50%;
    height: 100%;
    z-index: 3;
    position: absolute;
    transform-origin: 100%;
    animation: ${props => rotateBy(props.$score * 36)} 4s linear forwards
`

export const SemiCircle3 = styled.div <{$score:number, $color:string}>`
    background: ${props => props?.$color};
    width: 50%;
    height: 100%;
    position: absolute;
    transform-origin: 100%;
    z-index: 4;
    animation: ${fadeOut} 0.1s linear 2.5s forwards
`
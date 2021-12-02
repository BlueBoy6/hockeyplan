import React from 'react'
import styled from 'styled-components'

export default function ButtonsChoices({ choices, value, onChange }) {
    
    return (
        <ButtonsChoicesStyle>
            {choices.map((choice, index) => <button className={`button${value.label === choice.label ? ' is-selected' : ''}`} key={index}  onClick={()=> onChange(choice)}>{choice.label}</button>)}
        </ButtonsChoicesStyle>
    )
}

const ButtonsChoicesStyle = styled.div`
    display: grid;
    grid-template-columns:  1fr 1fr;
    .button{
        margin-left: 5px;
        &:first-child{
            margin-left: 0px;
        }
        &:last-child{
            margin-bottom: 5px;
        }
        &.is-selected{
            background: #004f91;
        }
    }
`
import styled from "styled-components";
import { useState } from "react";
import { Sunrise, Sunset, Sun, Moon } from "react-feather";
import { darken } from "polished";

const CardContainer = styled.div.attrs(props => ({
    isChecked: props.isChecked
}))`
    min-height: 12rem;
    display: flex;
    position: relative;
    border-radius: 1.563rem;
    background-color: ${props => props.isChecked ? '#9ee2ae' : 'lavender'};
    border: solid 1px ${darken(0.2, 'lavender')};
    img {
        margin: auto;
        min-width: 60%;
        max-height: 80%;
    }
`

const Information = styled.div.attrs(props => ({
    isChecked: props.isChecked
}))`
    position: absolute;
    border-radius: 1.563rem;
    cursor: pointer;
    padding: 0.438rem;
    box-sizing: border-box;
    font-size: 0.938rem;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: flex-end;
    background-color: ${props => props.isChecked ? '#497052' : '#404066'};
    color: lavender;
    div:not(:last-child) {
        margin-bottom: 0.438rem;
    }
    svg {
        width: 1.1rem;
        :not(:last-child) {
            margin-right: .2rem;
        }
    }
`

const List = styled.div`
    display: flex;
    flex-direction: column;
`

const weatherMap = {
    'Sunny': '☀️',
    'Rain': '🌧️',
    'Windy': '💨',
    'Storm': '⚡',
    'Snow': '❄️',
    'Blizzard': '🧊' 
}

const seasonMap = {
    'Winter': '☃️',
    'Spring': '🌱',
    'Summer': '⛱️',
    'Fall': '🍂'
}

const dayTimesMap = {
    '/': '/',
    'Matin': <Sunrise></Sunrise>,
    'Après-midi': <Sun></Sun>,
    'Soirée': <Sunset></Sunset>,
    'Nuit': <Moon></Moon>
}

const weathers = ['☀️', '🌧️', '💨', '⚡', '❄️', '🧊'];
const dayTimes = [<Sunrise></Sunrise>, <Sun></Sun>, <Sunset></Sunset>, <Moon></Moon>];

function Card({ item, index, toggleCheck, isChecked }) {
    const [hovered, setHovered] = useState(false);

    return (
        <CardContainer onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
                       onClick={() => toggleCheck(index)} isChecked={isChecked}
        >
            <img src={`${process.env.PUBLIC_URL}/images/${item.image}`} alt={item.en} />
            { hovered &&
                <Information isChecked={isChecked}>
                    <List>{ item.location.map((location) => (
                       <div>{ location }</div> 
                    ))}</List>
                    <div>{ item.en }</div>
                    <div>{ item.weather.map((weather) => weather !== '/' ? weatherMap[weather] : weathers.join(' ') )}</div>
                    <div>{ item.dayTime.map((time) => time !== '/' ? dayTimesMap[time] : dayTimes)}</div>
                    <div>{ item.season.map((season) => seasonMap[season])}</div>
                </Information>
            }
        </CardContainer>
    )
}

export default Card;
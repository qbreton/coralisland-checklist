import styled from "styled-components";
import { useState } from "react";
import Card from "./card";
import SearchBar from "./searchbar";
import { Sunrise, Sunset, Sun, Moon } from "react-feather";
import { darken } from "polished";

const Container = styled.div`
    padding: 0 2.5rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    > *:not(:last-child) {
        margin-bottom: .9375rem;
    }
`

const List = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: .9375rem;
`

const Item = styled.div.attrs(props => ({
    isChecked: props.isChecked
}))`
    cursor: pointer;
    display: flex;
    text-decoration: ${props => props.isChecked ? 'line-through' : 'none'};
    div:not(:last-child) {
        margin-right: .625rem;
    }

    div:not(:first-child) {
        width: 40%;
        text-align: left;
    }
`

const FilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
`

const Filters = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    box-sizing: border-box;
    width: fit-content;
    span {
        text-align: left;
    }
    :last-child {
        flex-direction: row;
        margin-top: .9375rem;
    }
`

const Wrapper = styled.div`
    display: flex;
`

const Filter = styled.div`
    font-size: .875rem;
    min-width: 3.125rem;
    width: fit-content;
    padding: .3125rem .625rem;
    box-sizing: border-box;
    cursor: pointer;
    background-color: lavender;
    border: solid 1px ${darken(0.2, 'lavender')};
    border-radius: .625rem;
    display: flex;
    justify-content: center;
    &:not(:last-child) {
        margin-right: .625rem;
    }
    &.active {
        background-color: #b0b0da;
    }
`

const invertedWeatherMap = {
    '☀️': 'Sunny',
    '🌧️': 'Rain',
    '💨': 'Windy',
    '⚡': 'Storm',
    '❄️': 'Snow',
    '🧊': 'Blizzard' 
}

const invertedSeasonMap = {
    '☃️': 'Winter',
    '🌱': 'Spring',
    '⛱️': 'Summer',
    '🍂': 'Fall'
}

const dayTimesMap = {
    '/': '/',
    'Matin': <Sunrise/>,
    'Après-midi': <Sun/>,
    'Soirée': <Sunset/>,
    'Nuit': <Moon/>
}

const dayTimes = ['/', 'Matin', 'Après-midi', 'Soirée', 'Nuit'];
const weathers = ['☀️', '🌧️', '💨', '⚡', '❄️', '🧊'];
const seasons = ['🌱', '⛱️', '🍂', '☃️'];

function Checklist({ listItems, itemType }) {
    function initLocalStorage() {
        let local = [];
        listItems.map(item => (
            local.push({name: item.en, caught: false})
        ))

        localStorage.setItem(itemType, JSON.stringify(local));
    }

    function getNumberCaught() {
        return items.reduce((acc, curr) => {
            return curr.caught ? acc + 1 : acc;
        }, 0)
    }

    if (localStorage.getItem(itemType) === null) {
        initLocalStorage(listItems);
    }

    const [items, setItems] = useState(JSON.parse(localStorage.getItem(itemType)));
    const [timeFilters, setTimeFilters] = useState([]);
    const [weatherFilters, setWeatherFilters] = useState([]);
    const [seasonFilters, setSeasonFilters] = useState([]);
    const [hideCaught, toggleHideCaught] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [numberCaught, setNumberCaught] = useState(getNumberCaught());

    function toggleCheck(index) {
        let newState = [...items];
        if (!newState[index].caught) {
            setNumberCaught(numberCaught + 1)
        } else {
            setNumberCaught(numberCaught - 1)
        }
        newState[index].caught = !newState[index].caught;
        setItems(newState);
        localStorage.setItem(itemType, JSON.stringify(newState));
    }

    function toggleFilter(filterName, filters, setFilterMethod) {
        let copy = [...filters];
        let indexOf = copy.indexOf(filterName); 
        if (indexOf > -1) {
            copy.splice(indexOf, 1);
        } else {
            copy.push(filterName);
        }
        setFilterMethod(copy);
    }

    return (
        <Container>
            <SearchBar search={searchString} setSearch={setSearchString}></SearchBar>
            { ['fishes', 'bugs'].includes(itemType) &&
                <FilterContainer>
                    <Filters>
                        <h3>Day time</h3>
                        <Wrapper>
                            { dayTimes.map((dayTime, index) => (
                                <Filter className={timeFilters.includes(dayTime) ? 'active' : ''}
                                        key={index} 
                                        onClick={() => toggleFilter(dayTime, timeFilters, setTimeFilters)}
                                >
                                    { dayTimesMap[dayTime] }
                                </Filter>
                            ))}
                        </Wrapper>
                    </Filters>
                    <Filters>
                        <h3>Weathers</h3>
                        <Wrapper>
                            { weathers.map((weather, index) => (
                                <Filter className={weatherFilters.includes(invertedWeatherMap[weather]) ? 'active' : ''}
                                        key={index} 
                                        onClick={() => toggleFilter(invertedWeatherMap[weather], weatherFilters, setWeatherFilters)}
                                >
                                    {weather}
                                </Filter>
                            ))}
                        </Wrapper>
                    </Filters>
                    <Filters>
                        <h3>Seasons</h3>
                        <Wrapper>
                            { seasons.map((season, index) => (
                                <Filter className={seasonFilters.includes(invertedSeasonMap[season]) ? 'active' : ''}
                                        key={index} 
                                        onClick={() => toggleFilter(invertedSeasonMap[season], seasonFilters, setSeasonFilters)}
                                >
                                    {season}
                                </Filter>
                            ))}
                        </Wrapper>
                    </Filters>
                    <Filters>
                        <Filter onClick={() => toggleHideCaught(!hideCaught)}>{hideCaught ? 'Show' : 'Hide'} found elements</Filter>
                        <span>{ numberCaught } / {items.length} caught</span>
                    </Filters>
                </FilterContainer>
            }
            { ['fishes', 'bugs'].includes(itemType) && 
                <List>
                    { listItems.map((item, index) => (
                        (timeFilters.length === 0 || item.dayTime.includes('/') || timeFilters.some(r => item.dayTime.includes(r))) &&
                        (weatherFilters.length === 0 || item.weather.includes('/') || weatherFilters.some(r => item.weather.includes(r))) &&
                        (seasonFilters.length === 0 || seasonFilters.some(r => item.season.includes(r))) &&
                        (!hideCaught || (hideCaught && !items[index].caught)) &&
                        (searchString === '' || item.en.toLowerCase().includes(searchString.toLowerCase()) 
                        || item.fr.toLowerCase().includes(searchString.toLowerCase())
                        || item.location.join(' ').toLowerCase().includes(searchString.toLowerCase())) &&
                        <Card item={item} key={index} index={index} toggleCheck={toggleCheck} 
                                          isChecked={items[index].caught}
                        ></Card>
                    ))}
                </List>
            }
            { !['fishes', 'bugs'].includes(itemType) && 
                <List>
                    { listItems.map((item, index) => (
                        <Item key={index} onClick={() => toggleCheck(index)} isChecked={items[index].caught}>
                            <div>
                                <input type="checkbox" checked={items[index].caught} onChange={() => {}}></input>
                            </div>
                            <div>{ item.en }</div>
                            <div>{ item.fr }</div>
                        </Item>
                    ))}
                </List>
            }
            
        </Container>
    )
}

export default Checklist;
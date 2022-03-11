import { useState } from "react";

export default function Searchbar(props) {
const[word,setWord] = useState(''); 

function searching(event){
const value= event.target.value;
setWord(value)

props.filter(value)
}
    return(
        <div>
            <input type='text' name='name' value={word} onChange={searching}/>
        </div>
    )
}
import { useState } from "react";
import {Options} from '../../utils/tags'

export default function Searchbar(props) {
const[word,setWord] = useState(''); 
const[tags,setTags]=useState([])

function searching(event){
const value= event.target.value;
setWord(value)

props.filter(value)
}
function handleInputChange(event) {

    const { name } = event.target;
   if(event.target.name === "tags") {
    
   const selected = [...event.target.options]
   
   .filter(option => option.selected)
     .map(option => option.value);
     
     props.searchTags(selected)
       
  // return setTags({...tags, [name]: selected})
}
   //return setTags({ ...tags, [name]: value });
 }
    return(
        <div>
            <input type='search' name='name' value={word} onChange={searching} placeholder='Search...' className="form-control m-3" style={{width: 360}} />
            <select onChange={handleInputChange} name="tags" id="userRequest_activity" className="form-select m-3" style={{width: 360}} aria-label="Default select example">
            <option selected value={""}>Filter by tags:</option>
                {Options.map((opt)=>(<option value={opt}>{opt}</option>))}
            </select>

        </div>
    )
}
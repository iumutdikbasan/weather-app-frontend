import { useState } from "react";
import {AsyncPaginate} from 'react-select-async-paginate';
import { GEO_API_URL,geoApiOptions } from "../api/api";

function Search({onSearchChange}) {  

  

   const [search, setSearch] = useState(null);

   const loadOptions = (inputValue) => {
       return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions)
         .then((res) => res.json())
         .then((res) => {
           const options = res.data.map((city) => ({

             label: city.city
           }));
           return { options };
         })
         .catch((err) => {
           console.log(err);
           return { options: [] };
         });
     };

   const handleOnChange = (searchData) => {
       setSearch(searchData);
       onSearchChange(searchData);
   }

   return (
       <AsyncPaginate
           placeholder="Search for city"
           debounceTimeout={600}
           value={search}
           onChange={handleOnChange}
           loadOptions={loadOptions}
           />
   )
}

export default Search
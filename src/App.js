import { useRef, useState } from 'react';
import './index.css';
import SuggestionInputSearch from 'suggestion-react-input-search';
import Home from './Component/home/Home';
import { click } from '@testing-library/user-event/dist/click';



function App() {
  const [user, setUser] = useState({});
  const [display, setdisplay] = useState([]);
  const [Name, setname] = useState();



  const nameRef = useRef();
 

  const handleTargetname = (usar) => {
    nameRef.current.value = usar;
    
    console.log('test tagert', usar);

    setname(usar)
    processChange()
    // setdisplay('')
   



  }


  const handlePassName = () => {
   
if(nameRef.current.value === ''){
  var name = 'bangladesh'
  console.log('handle pass name chk', name);
  const namejson = { name };

  // console.log(name);
  fetch(`http://localhost:3007/country`, {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(namejson)
  })
    .then((res) => res.json())

    .then((data) => setUser(data));


  console.log(user);
 
  // processChange()

}else{

  name = nameRef.current.value;
  console.log('handle pass name chk', name);
  const namejson = { name };

  // console.log(name);
  fetch(`http://localhost:3007/country`, {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(namejson)
  })
    .then((res) => res.json())

    .then((data) => setUser(data));


  console.log(user);

}
   

  }



  // debounce
  function debounce(func, timeout = 500) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };

  }
  // using debounce

  const processChange = debounce(() => handlePassName());

  // name suggestion


  const matchPeople = (input) => {

    if (input === "") {
              console.log('no value click');
    }else{

      let reg = new RegExp(input, 'i')

      return browserList.map(element => {
  
        if (element.match(reg)) {
  
          return element
        }
      });

    }

   

  }

  const changeInput = () => {

    // const name = nameRef.current.value;
    const name = nameRef.current.value;

    const autoCompleteResult = matchPeople(name);
    console.log(autoCompleteResult);
    setdisplay(autoCompleteResult)
  }




  const handleroot = () =>{
setdisplay([])
  }









  return (
    <header onClick={()=>{handleroot()}} id='head'>
      <h1 className='head' >Weather in </h1>
      <form id='blg' className="search-loaction searchbox">
        <input
          ref={nameRef}
          // list="browsers"
          // id="browsers"
          id="textinput"
          type="text"
          name="city"
          onChange={changeInput}
          placeholder="What city?"
          onKeyUp={() => { processChange() }}
          // onChange={() => { handlePassName() }}
          className="form-control text-muted form-rounded p-4 shadow-sm"

        />

        <ul className="suggestions">

         
          {

             

            display && display.length > 0 && display.map(mapuser => <li
              onClick={() => {
                //
                handleTargetname(mapuser)
              }}

            >

              {mapuser}

            </li>)
          }

        </ul>
      </form>

      <div className="card rounded my-3 shadow-lg back-card">
        <div className="card-top text-center my-3">
          <div className="city-name my-3">
            <p>{user?.location?.name || 'chittagong'}</p>
            <span>...</span>
          </div>
        </div>

        <div className="card-body my-5">
          <div className="card-mid row">
            <div className="col-8 text-center temp">
              <span>{user?.current?.temp_c|| '36,9'}&deg;C</span>
            </div>
            <div className="col-4 condition-temp">
              {/* <p className="condition">{this.props.weatherResult.weather[0].description}</p> */}
              <p className="high">tz_id: {user?.location?.tz_id || 'Asia/Dhaka'}&deg;C</p>
              <h2 className="low">Country {user?.location?.country|| "Bangladesh"}</h2>
            </div>
          </div>

          <div className="icon-container card shadow mx-auto">
            <img src={user?.current?.condition?.icon || 'http://cdn.weatherapi.com/weather/64x64/day/113.png'} alt="" srcset="" />

          </div>
          <div className="card-bottom px-5 py-4 row">
            <div className="col text-center">
              <p>{user?.current?.feelslike_c || "35.6"}&deg;C</p>
              <span>Feels Like</span>
            </div>
            <div className="col text-center">
              <p>{user?.current?.humidity || '15'}%</p>
              <span>Humidity</span>
            </div>
          </div>
        </div>
      </div>
    </header>


  );
}

const browserList = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Austrian Empire',
  'Azerbaijan',
  'bangladesh'
];


export default App;

import { useRef, useState } from 'react';
import './index.css';
import SuggestionInputSearch from 'suggestion-react-input-search';
import Home from './Component/home/Home';
import { click } from '@testing-library/user-event/dist/click';



function App() {
  const [Countries, setCountries] = useState({});
  const [Users, setUsers] = useState([]);
  const [Name, setname] = useState();



  const getInputValue = useRef();





  const handleCatchInputValue = (user) => {
    getInputValue.current.value = user;

    console.log('test tagert', user);

    setname(user)
    processChange()
    setUsers('')




  }


  const handlePassInputName = () => {

    // if(nameRef.current.value === ''){
    //   var name = 'bangladesh'
    //   console.log('handle pass name chk', name);
    //   const namejson = { name };

    //   // console.log(name);
    //   fetch(`http://localhost:3007/country`, {
    //     method: 'post',
    //     headers: { 'content-type': 'application/json' },
    //     body: JSON.stringify(namejson)
    //   })
    //     .then((res) => res.json())

    //     .then((data) => setUser(data));


    //   console.log(user);

    //   // processChange()

    // }
    // else{

    let name = getInputValue.current.value;
    console.log('handle pass name chk', name);
    const NameConvertObject = { name };

    // console.log(name);
    fetch(`http://localhost:3007/country`, {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(NameConvertObject)
    })
      .then((res) => res.json())

      .then((data) => setCountries(data));


    console.log(Countries);

   


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

  const processChange = debounce(() => handlePassInputName());

  // name suggestion


  const matchPeople = (input) => {

    if (input === "") {
      console.log('no value click');
    } else {

      let reg = new RegExp(input, 'i')

      return browserList.map(element => {

        if (element.match(reg)) {

          return element
        }
      });

    }



  }

  const changeInput = () => {
    let name = getInputValue.current.value;
    // const name = nameRef.current.value;
    if (name === '') {
      name = 'a'
      matchPeople(name);
    }

    const autoCompleteResult = matchPeople(name);
    console.log(autoCompleteResult);
    setUsers(autoCompleteResult)
  }




  const handleroot = (event) => {
    console.log('handle root');

    //  setdisplay([]);
    // event.stopPropagation();
    // window.onload=function(){
    //   var hidediv = document.getElementById('div1');
    //   document.onclick = function(div){
    //     if(div.target.id !== 'div1'){
    //       hidediv.style.display='none';
    //       console.log('thsi raw js touch');
    //     }
    //   }
    // }



  }












  return (
    <header onClick={() => { handleroot() }} id='head'>
      <h1 className='head' >Weather in </h1>
      <form id='blg' className="search-loaction searchbox">
        <input
          ref={getInputValue}
          autoComplete='off'
          // list="browsers"
          // id="browsers"
          id="textinput"
          type="text"
          name="city"
          onSelect={changeInput}
          placeholder="What city?"
          onKeyUp={() => { processChange() }}
          // onChange={() => { handlePassName() }}
          className="form-control text-muted form-rounded p-4 shadow-sm"

        />

        <ul className="suggestions ">


          {
            Users && Users.length > 0 && Users.map(User => <li
              id='div1'
              onClick={() => {
                handleCatchInputValue(User)
              }}
            >
              {User}

            </li>)
          }

        </ul>
      </form>

      <div className="card rounded my-3 shadow-lg back-card">
        <div className="card-top text-center my-3">
          <div className="city-name my-3">
            <p>{Countries?.location?.name || 'chittagong'}</p>
            <span>...</span>
          </div>
        </div>

        <div className="card-body my-5">
          <div className="card-mid row">
            <div className="col-8 text-center temp">
              <span>{Countries?.current?.temp_c || '36,9'}&deg;C</span>
            </div>
            <div className="col-4 condition-temp">
              {/* <p className="condition">{this.props.weatherResult.weather[0].description}</p> */}
              <p className="high">tz_id: {Countries?.location?.tz_id || 'Asia/Dhaka'}&deg;C</p>
              <h2 className="low">Country {Countries?.location?.country || "Bangladesh"}</h2>
            </div>
          </div>

          <div className="icon-container card shadow mx-auto">
            <img src={Countries?.current?.condition?.icon || 'http://cdn.weatherapi.com/weather/64x64/day/113.png'} alt="" srcset="" />

          </div>
          <div className="card-bottom px-5 py-4 row">
            <div className="col text-center">
              <p>{Countries?.current?.feelslike_c || "35.6"}&deg;C</p>
              <span>Feels Like</span>
            </div>
            <div className="col text-center">
              <p>{Countries?.current?.humidity || '15'}%</p>
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

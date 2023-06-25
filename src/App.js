import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

    const [data,setData] = useState(null)
    const [timeS,setTimeS]=useState(null)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)

    useEffect(()=>{
        (
        async function(){
            try{
                setLoading(true)
                axios.defaults.headers.get['Content-Type'] ='application/json;charset=utf-8';
                axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
                const response = await axios.get('https://api-rocketlc.vercel.app/ssl')
                console.log(response.data)
                setInterval(()=>{
                  let dataConfig = response.data.body.map((item)=>{
                    let newDate = (new Date(item.datetime)-Date.now())
                    let timeRes = Math.round(newDate/1000)
                    let minutes = Math.round(timeRes / 60)
                    let hours = Math.round(minutes/60)
                    let days = Math.round(hours/24)

                    let resHours = hours % 24
                    let resMinutes = minutes % 60
                    let resSeconds = timeRes % 60

                    item.timeRes = {days:days,hours:resHours,minutes:resMinutes,seconds:resSeconds}
                    return item
                  })
                  setData(dataConfig)
                },1000)

            }
            catch(err){
                setError(err)
            }finally{
                setLoading(false)
            }
        }
        )()
    },[])



  return (<>
 
    <div className="App">
    
      <header className="App-header">
     <h1>Rocket Schedule</h1>
     <hr/>
      {loading && <div>Loading...</div>}

      {data && data.map(item => (

        <Card className='cardCenter' style={{ width: '30rem' }}>
        <Card.Img variant="top" src="" />
          <Card.Body >
        <Card.Title><b>Foguete:</b>  {item.name} <p><b>Empresa:</b>  {item.empire}</p> </Card.Title>
        <Card.Text>
     <p><b>Missão:</b> {item.mission}</p>
     <p><b>Lançamento em:</b>  <i>{item.timeRes.days} dias, {item.timeRes.hours} horas, {item.timeRes.minutes} minutos, {item.timeRes.seconds} segundos</i></p>
        </Card.Text>
  
      </Card.Body>
    </Card>
      ))}

        <p>
          By <code>ReySofts</code> 2023.
        </p>
        <a
          className="App-link"
          href="https://github.com/reinanbr"
          target="_blank"
          rel="noopener noreferrer"
        >
          your solution in softwares
        </a>
      </header>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" crossorigin></script>

<script
  src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
  crossorigin></script>

<script
  src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"
  crossorigin></script>
    </>);
}



export default App;

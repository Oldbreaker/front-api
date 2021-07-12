import React, {useState } from 'react';
import { produce } from "immer";
import "bootstrap/dist/css/bootstrap.min.css";

interface Person {
    Entidad_Federativa: string;
    Municipio: string;
    Nombre: string;
  }
  const App = () => {
    const [people, setPeople] = useState<Person[]>([
      { Entidad_Federativa: '', Municipio: '', Nombre: '' },
      { Entidad_Federativa: '', Municipio: '', Nombre: '' },
      { Entidad_Federativa: '', Municipio: '', Nombre: '' },
      { Entidad_Federativa: '', Municipio: '', Nombre: '' },
      { Entidad_Federativa: '', Municipio: '', Nombre: '' },
      { Entidad_Federativa: '', Municipio: '', Nombre: '' },
      { Entidad_Federativa: '', Municipio: '', Nombre: '' },
      { Entidad_Federativa: '', Municipio: '', Nombre: '' },
      { Entidad_Federativa: '', Municipio: '', Nombre: '' },
      { Entidad_Federativa: '', Municipio: '', Nombre: '' }
    ]);
    const [info, setinfo] = useState([""])

    async function postData() {
      try {
          let result= await fetch('http://127.0.0.1:8000/api/nombres',{
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            
          },
          body:JSON.stringify(people),
          
        })
        .then(result => result.json())
        .then(data =>{setinfo(data)})
      } catch (error) {
        console.log(error)
      }
      
    }
   
    return (
      <div style={{ textAlign: "center" }}>
        {people.map((p, index) => {
          return (
            <div className="input-group mb-3">
              <input className="form-control"
                onChange={e => {
                  const Entidad_Federativa = e.target.value;
                  setPeople(currentPeople =>
                    produce(currentPeople, v => {
                      v[index].Entidad_Federativa = Entidad_Federativa;
                    })
                  );
                }}
                value={p.Entidad_Federativa}
                placeholder='Estado'
              />
              <input className="form-control"
                onChange={e => {
                  const Municipio = e.target.value;
                  setPeople(currentPeople =>
                    produce(currentPeople, v => {
                      v[index].Municipio = Municipio;
                    })
                  );
                }}
                value={p.Municipio}
                placeholder='Municipio'
              />
               <input className="form-control"
                onChange={e => {
                  const Nombre = e.target.value;
                  setPeople(currentPeople =>
                    produce(currentPeople, v => {
                      v[index].Nombre = Nombre;
                    })
                  );
                }}
                value={p.Nombre}
                placeholder='Nombre'
              />
            </div>
          );
        })}
        <div>
          <button className="btn btn-primary" onClick={postData}>
            Enviar
          </button>
         <p >El nombre que más se repite es {info[0][0]} </p>
        </div>
        <div></div>
      </div>
    );
  };

export default App;

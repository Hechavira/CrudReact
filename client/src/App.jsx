
import './App.css';
import { useState} from "react";
import Axios from "axios";
import Swal from 'sweetalert2'

import 'bootstrap/dist/css/bootstrap.min.css';



function App() {




  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidoP, setApellidoP] = useState("");
  const [apellidoM, setApellidoM] = useState("");
  const [edad, setEdad] = useState("");
  const [sexo, setSexo] = useState([]);
  const [calle, setCalle] = useState("");
  const [numExt, setNumExt] = useState("");
  const [numInt, setNumInt] = useState("");
  const [colonia, setColonia] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [estado, setEstado] = useState("");

  const [intpers, setIntPers] = useState([]);
  const [tipHab, setTipHab] = useState([]);
  const [ingMens, setIngMens] = useState([]);
  const [viajes, setViajes] = useState([]);


  const [editar, setEditar] = useState(false);

  const [UsuariosList, setUsuarios] = useState([]);
  const add = ()=>{
    Axios.post("http://localhost:3001/create", {

      nombre:nombre,

      apellidoP:apellidoP,
      apellidoM:apellidoM,
      edad:edad,
      sexo:sexo,
      calle:calle,
      numExt:numExt,
      numInt:numInt,
      colonia:colonia,
      municipio:municipio,
      estado:estado,


      intpers:intpers,
      tipHab:tipHab,
      ingMens:ingMens,
      viajes:viajes,

    }).then(()=>{
      getUsuarios();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Registro exitoso</strong>",
        html: "<i>El usuario fue registrado con exito</i>",

        icon: "success"
      })
    });
  }

  const update = ()=>{
    Axios.put("http://localhost:3001/update", {
      id:id,
      nombre:nombre,

      apellidoP:apellidoP,
      apellidoM:apellidoM,
      edad:edad,
      sexo:sexo,
      calle:calle,
      numExt:numExt,
      numInt:numInt,
      colonia:colonia,
      municipio:municipio,
      estado:estado,

      intpers:intpers,
      tipHab:tipHab,
      ingMens:ingMens,
      viajes:viajes,

    }).then(()=>{
      getUsuarios();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Actualizado</strong>",
        html: "<i>El usuario fue acualizado con exito</i>",
        icon: "success"
      })
    });
  }

  const eliminarUsuario = (val)=>{
    Swal.fire({
      title: 'Eliminar',
      html: "<i>¿Desea eliminar a <strong>"+val.nombre+"?</strong></i>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`).then(()=>{
        getUsuarios();
        limpiarCampos();
        Swal.fire(
        'Eliminado!',
        val.nombre+"fue eliminado",
          'success'
      );
    });

      }
    });

  }

  const limpiarCampos = ()=>{

    setNombre("");
    setApellidoP("");
    setApellidoM("");
    setEdad("");
    setSexo([]);
    setCalle("");
    setNumExt("");
    setNumInt("");
    setColonia("");
    setMunicipio("");
    setEstado("");

    setEditar(false);
    setIntPers([]);
    setTipHab([]);
    setIngMens([]);
    setViajes([]);
  }
  const editarUsuario = (val)=>{
    setEditar(true);
    setId(val.id);
    setNombre(val.nombre);
    setApellidoP(val.apellidoP);
    setApellidoM(val.apellidoM);
    setEdad(val.edad);
    setSexo(val.sexo);
    setCalle(val.calle);
    setNumExt(val.numExt);
    setNumInt(val.numInt);
    setColonia(val.colonia);
    setMunicipio(val.municipio);
    setEstado(val.estado);
    setEstado(val.estado);
    setIntPers(val.intpers);
    setTipHab(val.tipHab);
    setIngMens(val.ingMens);
    setViajes(val.viajes);

  }



  const getUsuarios = ()=>{
    Axios.get("http://localhost:3001/usuarios",).then((response)=>{
      setUsuarios(response.data);
    });
  }

  getUsuarios();


  return (



    <div className='container'>
<h1>{process.env.REACT_APP_SECRET}</h1>
    <div className="card text-center">
    <div className="card-header">
      Gestion de Usuarios
    </div>
    <div className="card-body">
            <div className="input-group mb-3">
          <span className="input-group-text"  id="basic-addon1">Nombre:</span>
          <input type="text"
           onChange={(event)=> {
            setNombre(event.target.value);
          }}
          className="form-control" value={nombre} placeholder="Ingrese un Nombre" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text"  id="basic-addon1">Ap. Paterno:</span>
          <input type="text" value={apellidoP}
           onChange={(event)=> {
            setApellidoP(event.target.value);
          }}
          className="form-control" placeholder="Ingrese apellido paterno" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text"  id="basic-addon1">Ap. Materno:</span>
          <input type="text" value={apellidoM}
           onChange={(event)=> {
            setApellidoM(event.target.value);
          }}
          className="form-control"  placeholder="Ingrese apellido materno" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text"  id="basic-addon1">Edad: </span>
          <input type="number" value={edad}
           onChange={(event)=> {
            setEdad(event.target.value);
          }}
          className="form-control"  placeholder="Ingrese edad" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>


        <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
        <span className="input-group-text" id="basic-addon1">Sexo</span>
        <input type="radio" value="Masculino"
         onChange={(event)=> {
          setSexo(event.target.value);
        }}
        className="btn-check" name="btnradio" id="btnradio1" autocomplete="off"/>
        <label className="btn btn-outline-primary" for="btnradio1">Masculino</label>

        <input type="radio" value="Femenino"
         onChange={(event)=> {
          setSexo(event.target.value);
        }}
        className="btn-check" name="btnradio" id="btnradio2" autocomplete="off"/>
            <label className="btn btn-outline-primary" for="btnradio2">Femenino</label>



            </div>







        <div className="input-group mb-3">
          <span className="input-group-text" value={calle} id="basic-addon1">Calle:</span>
          <input type="text"
           onChange={(event)=> {
            setCalle(event.target.value);
          }}
          className="form-control" value={calle} placeholder="Ingrese calle" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>



        <div className="input-group mb-3">
          <span className="input-group-text"value={numInt} id="basic-addon1">Num. Int:</span>
          <input type="number"
           onChange={(event)=> {
            setNumInt(event.target.value);
          }}
          className="form-control" value={numInt} placeholder="Ingrese Num. Interior" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>


        <div className="input-group mb-3">
          <span className="input-group-text"value={numExt} id="basic-addon1">Num. Ext:</span>
          <input type="number"
           onChange={(event)=> {
            setNumExt(event.target.value);
          }}
          className="form-control" value={numExt} placeholder="Ingrese Num. Exterior" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text"value={colonia} id="basic-addon1">Colonia:</span>
          <input type="text"
           onChange={(event)=> {
            setColonia(event.target.value);
          }}
          className="form-control"value={colonia} placeholder="Ingrese colonia" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>


        <div className="input-group mb-3">
          <span className="input-group-text" value={municipio} id="basic-addon1">Municipio:</span>
          <input type="text"
           onChange={(event)=> {
            setMunicipio(event.target.value);
          }}
          className="form-control" value={municipio} placeholder="Ingrese municipio" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>


        <div className="input-group mb-3">
          <span className="input-group-text"value={estado} id="basic-addon1">Estado:</span>
          <input type="text"
           onChange={(event)=> {
            setEstado(event.target.value);
          }}
          className="form-control" value={estado} placeholder="Ingrese estado" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>




        <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
        <span className="input-group-text" id="basic-addon1">Interes personal</span>
  <input type="checkbox" value="Musica"
   onChange={(event)=> {
    setIntPers(event.target.value);
  }}
  className="btn-check" id="btncheck1" autocomplete="off"/>
  <label className="btn btn-outline-primary" for="btncheck1">Musica</label>

  <input type="checkbox" value="Cine"
   onChange={(event)=> {
    setIntPers(event.target.value);
  }}
  className="btn-check" id="btncheck2" autocomplete="off"/>
  <label className="btn btn-outline-primary" for="btncheck2">Cine</label>

  <input type="checkbox" value="compras"

  onChange={(event)=> {
    setIntPers(event.target.value);
  }}
  className="btn-check" id="btncheck3" autocomplete="off"/>
  <label className="btn btn-outline-primary" for="btncheck3">Compras</label>
</div>


<div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
        <span className="input-group-text" id="basic-addon1">Tipo de habitacion</span>
        <input type="radio" value="Casa propia"
         onChange={(event)=> {
          setTipHab(event.target.value);
        }}
        className="btn-check" name="btnradio3" id="btnradio3" autocomplete="off"/>
        <label className="btn btn-outline-primary" for="btnradio3">Casa propia</label>

        <input type="radio" value="Departamento"
         onChange={(event)=> {
          setTipHab(event.target.value);
        }}
        className="btn-check" name="btnradio3" id="btnradio4" autocomplete="off"/>
            <label className="btn btn-outline-primary" for="btnradio4">Departamento</label>

            <input type="radio" value="Renta"
         onChange={(event)=> {
          setTipHab(event.target.value);
        }}
        className="btn-check" name="btnradio3" id="btnradio5" autocomplete="off"/>
            <label className="btn btn-outline-primary" for="btnradio5">Renta</label>



            </div>




            <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
        <span className="input-group-text" id="basic-addon1">Ingreso Mensual</span>
        <input type="radio" value="2,500 - 5,000"
         onChange={(event)=> {
          setIngMens(event.target.value);
        }}
        className="btn-check" name="btnradio2" id="btnradio6" autocomplete="off"/>
        <label className="btn btn-outline-primary" for="btnradio6">2,500 - 5,000</label>

        <input type="radio" value="5,001 - 7,000"
         onChange={(event)=> {
          setIngMens(event.target.value);
        }}
        className="btn-check" name="btnradio2" id="btnradio7" autocomplete="off"/>
            <label className="btn btn-outline-primary" for="btnradio7">5,001 - 7,000</label>

            <input type="radio" value="7,001 - 10,000"
         onChange={(event)=> {
          setIngMens(event.target.value);
        }}
        className="btn-check" name="btnradio2" id="btnradio8" autocomplete="off"/>
            <label className="btn btn-outline-primary" for="btnradio8">7,001 - 10,000</label>

            </div>






            <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
        <span className="input-group-text" id="basic-addon1">Viajes</span>
        <input type="radio" value="1 - 3"
         onChange={(event)=> {
          setViajes(event.target.value);
        }}
        className="btn-check" name="btnradio1" id="btnradio9" autocomplete="off"/>
        <label className="btn btn-outline-primary" for="btnradio9">1 - 3</label>

        <input type="radio" value="4 - 6"
         onChange={(event)=> {
          setViajes(event.target.value);
        }}
        className="btn-check" name="btnradio1" id="btnradio10" autocomplete="off"/>
            <label className="btn btn-outline-primary" for="btnradio10">4 - 6</label>

            <input type="radio" value="7 - 10"
         onChange={(event)=> {
          setIngMens(event.target.value);
        }}
        className="btn-check" name="btnradio1" id="btnradio11" autocomplete="off"/>
            <label className="btn btn-outline-primary" for="btnradio11">7 - 10</label>

            </div>






    </div>
    <div className="card-footer text-body-secondary">
          {
            editar?
            <div>
            <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
            <button className='btn btn-info m-2'onClick={limpiarCampos}>Cancelar</button>
            </div>
            :<button className='btn btn-success ' onClick={add}>Registrar</button>
          }


    </div>
</div>
    <table className="table table-striped">
    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Ap. paterno</th>
      <th scope="col">Ap. materno</th>
      <th scope="col">Edad</th>
      <th scope="col">sexo</th>
      <th scope="col">Calle</th>
      <th scope="col">Numero Int</th>
      <th scope="col">Numero Ext</th>
      <th scope="col">Colonia</th>
      <th scope="col">Municipio</th>
      <th scope="col">Estado</th>
      <th scope="col">Interes pers</th>
      <th scope="col">tipo habitacion</th>
      <th scope="col">Ingreso Mensual</th>
      <th scope="col">Viajes</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
  {
      UsuariosList.map((val,key)=>{
        return <tr key={val.id}>
          <th>{val.id}</th>
          <td>{val.nombre}</td>
          <td>{val.apellidoP}</td>
          <td>{val.apellidoM}</td>
          <td>{val.edad}</td>
          <td>{val.sexo}</td>
          <td>{val.calle}</td>
          <td>{val.numInt}</td>
          <td>{val.numExt}</td>
          <td>{val.colonia}</td>
          <td>{val.municipio}</td>

          <td>{val.estado}</td>
          <td>{val.intpers}</td>
          <td>{val.tipHab}</td>
          <td>{val.ingMens}</td>
          <td>{val.viajes}</td>
          <td>
          <div className="btn-group" role="group" aria-label="Basic mixed styles example">
            <button type="button"
            onClick={()=>{
              editarUsuario(val);
            }}
            className="btn btn-info">Editar</button>
            <button type="button"
             onClick={()=>{
              eliminarUsuario(val);
            }}
            className="btn btn-warning">Eliminar</button>

          </div>
          </td>


          </tr>


      })
    }


  </tbody>
    </table>
    </div>
  )

}

export default App;

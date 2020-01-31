import React, { useState, useEffect} from 'react'
import api from './services/api'

import './Global.css';
import './SideBar.css';
import './App.css';
import './Main.css'

import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

function App() {

    const [devs, setDevs] = useState([])

    
    useEffect(() => {
        async function loadDevs(){
            const response = await api.get('/devs');
            setDevs(response.data);
        }
        loadDevs();
    }, [])

    async function handleAddDev(data){
        const response = await api.post('/devs',data)
        console.log(data)
        setDevs([...devs, response.data]) // copio o array de devs e acrescento o dev adicionado.
    }

    // FIXME: erro na api, nao está cadastrando o novo dev
    

    return (
    <div id="app">
        <aside>
            <strong>Cadastrar</strong> 
            <DevForm onSubmit={handleAddDev} />
        </aside>
        <main>
            <ul>
                { /* Loop para mostrar os devs ja cadastrados */ }
                { devs.map( dev => ( 
                    <DevItem key={dev._id} dev={dev} />
                ))}
                { /* Fim do loop */ }
            </ul>
        </main>
    </div>
    );
}

export default App;

import React, { Component } from 'react';
import api from '../api/api';
import './main.css';

class Main extends Component {

    constructor(){
        super()

        this.state = {
            esportes: [],
            form: {
                modalidade: '',
                tipo: '',
                distancia: '',
                sexo: '',
                local: '',
            }
        }
    }

    componentDidMount(){
        this.getLista();
    }

    getLista = () => {
        api.getEsportes().then((success) => {
            const { data } = success;

            this.setState({ esportes: data })
        }).catch((error) => {
            alert('Ocorreu um erro');
        })
    }
  
    getEsporte = () => {

    }
  
    addEsporte = () => {
        const { form } = this.state;

        api.postEsporte(form).then((success) => {
            console.log(success);
            this.getLista();
        }).catch((error) => {
            alert('Ocorreu um erro');
        })
    }

    setForm = (event) => {
        const { form } = this.state;

        const { value } = event.target;
        const s = event.target.name;

        this.setState({ form: { ...form, [s]: value } });
    }
  
    render(){

        const { esportes, form: { distancia, local, modalidade, sexo, tipo } } = this.state;

        return (
            <div className="main">
                <div className="main__lista">
                    <h2>Lista de esportes</h2>
                    {esportes.length <= 0 ?
                        <div>Oops... Sem resultados</div>
                        : esportes.map((e, i) => (
                            <div key={i} className="main__lista__card">
                                <h3>{e.modalidade}</h3>
                                <div className="main__lista__card__info">
                                    <p className="main__lista__card__info__data"><span className="main__lista__card__info__data--label">Local: </span>{e.local}</p>
                                    <p className="main__lista__card__info__data"><span className="main__lista__card__info__data--label">Distância: </span>{e.distancia}Km</p>
                                    <p className="main__lista__card__info__data"><span className="main__lista__card__info__data--label">Sexo: </span>{e.sexo}</p>
                                    <p className="main__lista__card__info__data"><span className="main__lista__card__info__data--label">Tipo: </span>{e.tipo}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="main__add">
                    <h2>Novo esporte</h2>
                    <div className="input__group">
                        <label className="input__label">Modalidade: </label>
                        <input className="input__control" onChange={this.setForm} name="modalidade" value={modalidade} />
                    </div>
                    <div className="input__group">
                        <label className="input__label">Tipo: </label>
                        <input className="input__control" onChange={this.setForm} name="tipo" value={tipo} />
                    </div>
                    <div className="input__group">
                        <label className="input__label">Distância: </label>
                        <input className="input__control" onChange={this.setForm} name="distancia" value={distancia} type="number" step=".01" />
                        <span>Km</span>
                    </div>
                    <div className="input__group">
                        <label className="input__label">Sexo: </label>
                        <select className="input__control" onChange={this.setForm} name="sexo" value={sexo}>
                            <option value="">Selecione...</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                            <option value="Misto">Misto</option>
                        </select>
                    </div>
                    <div className="input__group">
                        <label className="input__label">Local: </label>
                        <input className="input__control" onChange={this.setForm} name="local" value={local} />
                    </div>
                    <button onClick={() => this.addEsporte()}>Adicionar esporte</button>
                </div>
            </div>
        );
    }
}



export default Main;
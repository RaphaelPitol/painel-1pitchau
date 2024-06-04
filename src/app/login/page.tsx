'use client'
import { SyntheticEvent, useCallback, useRef, useState } from "react";
import styles from "./style.module.css";
import axios from "axios";
import { Toast } from "@/componentes/Toast";
import { Loading } from "@/componentes/Loading";

export default function Login() {

    const refForm = useRef<any>()
    const [toast, setToast] = useState(false)
    const [loading, setLoading] = useState(false)

    const submitForm = useCallback((e: SyntheticEvent)=>{
        e.preventDefault();

        if(refForm.current.checkValidity()){
           const target = e.target as typeof e.target & {
            email:{value: string},
            senha: {value: string},
           }     

           axios.post('/api/login',{
            email: target.email.value,
            senha: target.senha.value,
        })
        .then(()=>{

        })
        .catch((err)=>{
            console.log(err)
            setToast(true)
        })

        }else{
            refForm.current.classList.add('was-validated')
        }

    },[])
    
    return (
        <>
        <Toast
        show={toast}
        message="Dados Inválidos"
        colors="danger"
        onClose={()=>{setToast(false)}}
        />
        <Loading
        loading={loading}
        />
            <div className={styles.main}>
                <div className={styles.border}>
                    <div className="d-flex flex-column align-items-center">
                        <h1 className="text-primary">Login</h1>
                        <p className="text-secondary">
                            Preencha os campos para logar no sistema!
                        </p>
                    </div>
                    <hr />
                    <form
                        action=""
                        className="needs-validation align-items-center"
                        noValidate
                        onSubmit={submitForm}
                        ref={refForm}
                    >
                        <div className="col-md-12 mt-1">
                            <label htmlFor="email" className="from-label">
                                E-mail
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Digite seu email"
                                id="email"
                                required
                            />
                            <div className="invalid-feedback">
                                Por favor digite seu email
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="senha" className="from-label">
                                Senha
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Digite sua senha"
                                id="senha"
                                required
                            />
                            <div className="invalid-feedback">
                                Por favor digite sua senha
                            </div>
                        </div>
                        <div className="col-md-12 mt-3">
                            <button
                                className="btn btn-primary w-100"
                                type="submit"
                                id="botao"
                            >
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

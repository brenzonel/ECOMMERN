import React, {useState} from 'react';
import Layout from './../../components/Layout/Layout';
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Dropdown } from 'primereact/dropdown';

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const questions = [
        { name: 'Nombre de tu mascota favorita', code: 'NY' },
        { name: 'Nombre de la marca de tenis favorita', code: 'RM' },
        { name: 'Nombre de la marca de tu telefono', code: 'LDN' }
    ];
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,
            {name, email, password, phone, address, answer});
            if(res && res.data.success){
                toast.success(res.data && res.data.message);
                navigate('/login');
            }else{
                toast.error(res.data.message);
            }
            //console.log(name, email, password, phone, address);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout title="Register Ecommer App">
            <div className='register'>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter Your Name"
                        required
                        autoFocus
                        />
                    </div>
                    <div className="mb-3">
                        <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter Your Email "
                        required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Enter Your Password"
                        required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter Your Phone"
                        required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter Your Address"
                        required
                        />
                    </div>
                    <div className="card flex justify-content-center">
                        <Dropdown value={selectedQuestion} onChange={(e) => setSelectedQuestion(e.value)} options={questions} optionLabel="name" 
                        placeholder="Select a Question" className="w-full md:w-14rem" checkmark={true} highlightOnSelect={false} />
                    </div>
                        <div className="mb-3">
                            <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Answer"
                            required
                            />
                        </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
        </Layout>
    );
};

export default Register;
import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AddTodo({ history, match }) {

    const { id } = match.params;
    const isAddMode = !id;

    const { register, handleSubmit, errors } = useForm(); // initialize the hook
    const [value, setValue] = useState(""); // initialize the hook

    const onSubmit = (data) => {
        console.log(data);
        return isAddMode
            ? createUser(data)
            : updateUser(id, data);
        // axios({
        //     method: 'post',
        //     url: 'http://localhost:8085/listTodo',
        //     data: {
        //         title: data.name,
        //         detail: data.detail
        //     }
        // });
    };

    function createUser(data) {
        axios({
            method: 'post',
            url: 'http://localhost:8085/listTodo',
            data: {
                title: data.title,
                email: data.email,
                phone: data.phone,
                gender: data.gender,
                detail: data.detail,
                hang: data.hang
            }
        });
    }

    function updateUser(id, data) {
        // axios({
        //     method: 'get',
        //     url: `http://localhost:8085/getListTodo/${id}`
        // }).then(res => handleSubmit(res.data));
        axios({
            method: 'put',
            url: `http://localhost:8085/put/${id}`,
            data: {
                title: data.title,
                email: data.email,
                phone: data.phone,
                gender: data.gender,
                detail: data.detail,
                hang: data.hang
            }
        });
    }

    useEffect(() => {
        axios
            .get(`http://localhost:8085/getListTodo/${id}`)
            .then(response => { setValue(response.data) });
    }, []);

    const handleOnChange = event => {
        const { name, value } = event.target;
        setValue({ [name]: value });
    };

    return (
        <div className="container">
            <h3>Todo List</h3>
            <form action="/http://localhost:8085/getListTodo" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">H??? v?? t??n</label>
                    <input
                        name="title"
                        value={value.title}
                        onChange={handleOnChange}
                        type="text"
                        ref={register({ pattern: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g })}
                        className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        {errors.title && <div class="alert alert-danger mx-0 my-3" role="alert">
                        H??? v?? t??n kh??ng h???p l???!</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input
                        name="email"
                        value={value.email}
                        onChange={handleOnChange}
                        type="text"
                        ref={register({ pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i })}
                        className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        {errors.email && <div class="alert alert-danger mx-0 my-3" role="alert">
                        Email kh??ng h???p l???!</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">S??? ??i???n tho???i</label>
                    <input
                        name="phone"
                        value={value.phone}
                        onChange={handleOnChange}
                        type="text"
                        ref={register({ pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im })}
                        className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        {errors.phone && <div class="alert alert-danger mx-0 my-3" role="alert">
                        S??? ??i???n tho???i kh??ng h???p l???!</div>}
                </div>
                <div class="form-group">
                    <label for="exampleFormControlSelect1">Gi???i t??nh</label>
                    <select name="gender" ref={register({ required: true })} class="form-control" id="exampleFormControlSelect1">
                        <option value="">Ch???n gi???i t??nh</option>
                        <option value="male">Nam</option>
                        <option value="female">N???</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">??i???m trung b??nh</label>
                    <input
                        name="detail"
                        value={value.detail}
                        onChange={handleOnChange}
                        type="text"
                        ref={register ({pattern: /^[0-9]/})}
                        className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        {errors.detail && <div class="alert alert-danger mx-0 my-3" role="alert">
                        ??i???m trung b??nh kh??ng h???p l???!</div>}
                </div>  
                <div class="form-group">
                    <label for="exampleFormControlSelect1">X???p lo???i</label>
                    <select name="hang" ref={register({ required: true })} class="form-control" id="exampleFormControlSelect1">
                        <option value="">Ch???n x???p lo???i</option>
                        <option value="Excellent">Xu???t s???c</option>
                        <option value="Very good">Gi???i</option>
                        <option value="Good">Kh??</option>
                        <option value="Faily good">Trung b??nh</option>
                        <option value="Bad">Y???u</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-success">Th??m sinh vi??n</button>
            </form>
            <a href="/" type="submit" className="btn btn-warning mt-4">V??? trang ch???</a>
        </div>
    );
}

export default AddTodo;

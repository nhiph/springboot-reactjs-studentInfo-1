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
                    <label htmlFor="exampleInputEmail1">Họ và tên</label>
                    <input
                        name="title"
                        value={value.title}
                        onChange={handleOnChange}
                        type="text"
                        ref={register({ pattern: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g })}
                        className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        {errors.title && <div class="alert alert-danger mx-0 my-3" role="alert">
                        Họ và tên không hợp lệ!</div>}
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
                        Email không hợp lệ!</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Số điện thoại</label>
                    <input
                        name="phone"
                        value={value.phone}
                        onChange={handleOnChange}
                        type="text"
                        ref={register({ pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im })}
                        className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        {errors.phone && <div class="alert alert-danger mx-0 my-3" role="alert">
                        Số điện thoại không hợp lệ!</div>}
                </div>
                <div class="form-group">
                    <label for="exampleFormControlSelect1">Giới tính</label>
                    <select name="gender" ref={register({ required: true })} class="form-control" id="exampleFormControlSelect1">
                        <option value="">Chọn giới tính</option>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Điểm trung bình</label>
                    <input
                        name="detail"
                        value={value.detail}
                        onChange={handleOnChange}
                        type="text"
                        ref={register ({pattern: /^[0-9]/})}
                        className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        {errors.detail && <div class="alert alert-danger mx-0 my-3" role="alert">
                        Điểm trung bình không hợp lệ!</div>}
                </div>  
                <div class="form-group">
                    <label for="exampleFormControlSelect1">Xếp loại</label>
                    <select name="hang" ref={register({ required: true })} class="form-control" id="exampleFormControlSelect1">
                        <option value="">Chọn xếp loại</option>
                        <option value="Excellent">Xuất sắc</option>
                        <option value="Very good">Giỏi</option>
                        <option value="Good">Khá</option>
                        <option value="Faily good">Trung bình</option>
                        <option value="Bad">Yếu</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-success">Thêm sinh viên</button>
            </form>
            <a href="/" type="submit" className="btn btn-warning mt-4">Về trang chủ</a>
        </div>
    );
}

export default AddTodo;

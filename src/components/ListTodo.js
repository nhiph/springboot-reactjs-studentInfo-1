import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ListTodo() {
    const [todos, setTodo] = useState([]);
    // useEffect(() => {
    //     axios
    //         .get("http://localhost:8085/getListTodo")
    //         .then(response => setTodo(response.data));
    // }, []);

    useEffect(() => {
        setTimeout(() => {
            axios
                   .get("http://localhost:8085/getListTodo")
                   .then(response => setTodo(response.data));
        }, 1000);

        // eslint-disable-line react-hooks/exhaustive-deps
      }, []);

    const showItem = todos.map((todo, index) => {
        return <tr key={index}>
                 <td>{todo.title}</td>
                 <td>{todo.email}</td>
                 <td>{todo.phone}</td>
                 <td>{todo.gender}</td>
                 <td>{todo.detail}</td>
                <td>{todo.hang}</td>
               <td>
                   <Link 
                        to = {`/listTodo/${todo.id}/edit`}
                        className="btn btn-success mr-3"
                        // onClick={() => onUpdate(todo)}
                        >Sửa</Link>
                   <button 
                        className="btn btn-danger mr-3"
                        onClick={() => onDelete(todo.id)}
                   >Xóa</button>
               </td>
               
     </tr>
    });

    const onDelete = (id) => {
        console.log(id);
        axios({
            method: 'delete',
            url: `http://localhost:8085/delete/${id}`
          }).then(res =>{
            setTodo(res.data)
          });
    }

    return (
        <div className="container">
            <h1>Student Information</h1>
            <table className="table">
                <thead className="thead-dark">
                <tr>
                    <th>Họ và tên</th>
                    <th>Email</th>
                    <th>Số điện thoại</th>
                    <th>Giới tính</th>
                    <th>Điểm trung bình</th>
                    <th>Xếp loại</th>
                    <th colSpan="2">Chỉnh sửa</th>
                </tr>
                </thead>
                <tbody>
                    {showItem}
                </tbody>
                
            </table>
            <a href="/" type="submit" className="btn btn-primary">Về trang chủ</a>
        </div>
    );
}

export default ListTodo;

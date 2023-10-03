import React, { useState, useEffect } from 'react';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';

const AdminHome = ()  => {
    const [students, setStudents] = useState([]);  // list of courses
    const [message, setMessage] = useState(' ');
    useEffect(() => {
        // called once after intial render
        fetchStudents();
        }, [] )


    const fetchStudents = () => {
        // const row_id = event.target.parentNode.parentNode.rowIndex - 1;

        fetch('http://localhost:8080/student')
        .then((response) => { return response.json(); } )
        .then((data) => { setStudents(data); })
        .catch((err) =>  { 
            console.log("exception fetchCourses "+err);
            setMessage("Exception. "+err);
         } );
    }
    const editStudent = (s) => {
        
        fetch("http://localhost:8080/student/"+ s.student_id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(s)
        })
        .then(res => {
            if (!res.ok) {
                console.log('Error editing student:', res.status);
            } else {
                fetchStudents();
            }
        })
        .catch(err => {
            console.error("Exception editing student:", err);
        });
    };
    const addStudent = (s) =>{
        fetch("http://localhost:8080/student",
        {
            method: "POST",
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(s)
        })
        .then((response) => response.json())
        .then((res)=> {
                console.log("addStudent ok");
                setMessage("Student added.");
                fetchStudents();
            
        })
        .catch(err=>{
            console.error("exception addStudent" + err);
            setMessage("Exception." + err);
        })
        return 0;
    }
    const dropStudent = (event) => {
      const row_id = event.target.parentNode.parentNode.rowIndex - 1;
      console.log("drop course "+row_id);
      const student_id = students[row_id].student_id;
      if (window.confirm('Are you sure you want to drop the course?')) {
        fetch('http://localhost:8080/student/' + student_id,
        {
            method: 'DELETE',
        }
        )
    .then(res => {
        if (res.ok) {
            console.log("drop ok");
            setMessage("Student dropped.");
            fetchStudents();
        } else {
            console.log("drop error");
            setMessage("Error dropStudent. "+res.status);
        }
        })
    .catch( (err) => {
        console.log("exception dropStudent "+err);
        setMessage("Exception. "+err);
     } );
    }
    }
    const headers = ['student_id', 'name', 'email', 'statusCode', 'status'," "];


    if (students.length === 0) {
        return (
          <div> 
          <div margin="auto" >
            <h3>Student List</h3>
          </div>
        </div>
      )
    }else{
      return(
        <div margin="auto" >
            <h3>Enrolled Students </h3>
            <h4>{message}</h4>
            <table className="Center"> 
                <thead>
                <tr>
                    {headers.map((s, idx) => (<th key={idx}>{s}</th>))}
                </tr>
                </thead>
                <tbody>
                {students.map((row,idx) => (
                        <tr key={idx}>
                        <td>{row.student_id}</td>
                        <td>{row.name}</td>
                        <td>{row.email}</td>
                        <td>{row.statusCode}</td>
                        <td>{row.status}</td>
                        <td><EditStudent editStudent={students[idx]} update={editStudent}/>
</td>

                        <td><button type="button" margin="auto" onClick={dropStudent}>Drop</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <EditStudent editStudent={editStudent}/> */}
            <AddStudent addStudent={addStudent} />
        </div>
    );
    }
    
}

export default AdminHome;

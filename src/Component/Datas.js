
import React from "react";
import "./form.css"
import api from "../APIS/api";

class DataList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            usersData:[]
            // Age: "",
            // ServiceType: "",
            // Dob: "",
            // PFeedback: "",
            // NFeedback: "",
            // succesFormsubmit: false

        }

    }
    async componentDidMount() {

        const result = await api.getData();
        console.log(result, "result");
        if(result && result.data){
            this.setState({usersData:result.data})
        }
        // Static data array


    }
    generateTable = (data) => {
        const tableHeader = document.getElementById("tableHeader");
        const tableBody = document.getElementById("tableBody");

        // Clear existing content in the table
        tableHeader.innerHTML = "";
        tableBody.innerHTML = "";

        // Create table headers dynamically
        const headers = Object.keys(data[0]);
        headers.forEach(header => {
            const th = document.createElement("th");
            th.textContent = header.charAt(0).toUpperCase() + header.slice(1);
            tableHeader.appendChild(th);
        });

        // Create table rows dynamically
        data.forEach(item => {
            const tr = document.createElement("tr");

            // Create table cells (td) for each property
            headers.forEach(key => {
                const td = document.createElement("td");
                td.textContent = item[key];
                tr.appendChild(td);
            });

            // Append row to table body
            tableBody.appendChild(tr);
        });
    }
    handlChange = (e) => {
        console.log(e, "eee");
        const { name, value } = e.target;


        this.setState({ [name]: value })
    }
    handlSubmit = async () => {
        let { username, password ,usersData} = this.state
        let userName = "SARVESH"
        let passWord = "sarvesh&murali@1987"



        try {
            console.log(username, "username");
            console.log(password, "password");
            console.log(userName, "userName");
            console.log(passWord, "passWord");


            var modal = document.getElementById('myModal');
            if (username === userName && passWord === password) {

                if (modal) {
                    modal.style.display = 'none';
                }
           
                this.generateTable(usersData);
            }
            else {
                alert("invalid details")
            }
            // const result = await api.signup(formData);
            // console.log(result, "result");
            // if (result) {
            //     window.scrollTo(500, 0);
            //     this.setState({
            //         Mobile: "", Name: "", Age: "", ServiceType: "", Dob: "", PFeedback: "", NFeedback: "", succesFormsubmit: true
            //     })
            //     setTimeout(() => {
            //         this.setState({ succesFormsubmit: false });
            //     }, 3000);


            // }
        } catch (error) {
            console.log(error, "error");
        }

    }
    render() {
        console.log("enter data form page");

        return (
            <>
                <div id="myModal" class="modal">
                    <div class="modal-content">
                        {/* <span class="close">&times;</span> */}
                        {/* <form class="form"> */}
                        <div className="formPage">
                            <div class="form-container">
                                {/* <form class="form"> */}

                                <div class="form-group">
                                    <label for="Mobile">UserName</label>
                                    <input type="text" name="username" value={this.state.username} required="" onChange={this.handlChange} />
                                </div>
                                <div class="form-group">
                                    <label for="email">Password</label>
                                    <input type="text" name="password" required="" value={this.state.password} onChange={this.handlChange} />
                                </div>

                                <button class="form-submit-btn" type="submit" onClick={this.handlSubmit}>Submit</button>
                                {/* </form> */}
                            </div>

                        </div>
                        {/* </form> */}

                    </div>
                </div>

                <div>
                <div class="container">
                    <table id="dataTable" class="table">
                        <thead>
                            <tr id="tableHeader"></tr>
                        </thead>
                        <tbody id="tableBody"></tbody>
                    </table>
                </div>
                  </div>

            </>


        )
    }
}
export default DataList;

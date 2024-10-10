import React from "react";
import "./form.css";
import api from "../APIS/api";

class DataList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            usersData: [],
            tableOpen: false,
            loading: false,
            isAuthenticated: false // Track if the user is authenticated
        };
    }

    async componentDidMount() {
        // Check if the user is already logged in by checking localStorage
        const isAuthenticated = localStorage.getItem("isAuthenticated");

        if (isAuthenticated === "true") {
            this.setState({ isAuthenticated: true, tableOpen: true });
            this.fetchData(); // Fetch data without opening the login modal
        }
    }

    fetchData = async () => {
        this.setState({ loading: true });

        try {
            const result = await api.getData();
            if (result && result.data) {
                this.setState({ usersData: result.data });
            }
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            this.setState({ loading: false });
        }
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async () => {
        const { username, password } = this.state;
        const storedUsername = "SARVESH";
        const storedPassword = "sarvesh&murali@1987";

        if (username === storedUsername && password === storedPassword) {
            // Save authentication flag to localStorage
            localStorage.setItem("isAuthenticated", "true");
            this.setState({ isAuthenticated: true, tableOpen: true });
            this.fetchData(); // Fetch data after login
        } else {
            alert("Invalid details");
        }
    };

    handleLogout = () => {
        // Clear localStorage and reset state
        localStorage.removeItem("isAuthenticated");
        this.setState({
            username: "",
            password: "",
            isAuthenticated: false,
            tableOpen: false,
            usersData: []
        });
    };

    render() {
        const { username, password, usersData, tableOpen, loading, isAuthenticated } = this.state;

        return (
            <>
                {!isAuthenticated && (
                    <div id="myModal" className="modal">
                        <div className="modal-content">
                            <div className="formPage">
                                <div className="form-container">
                                    <div className="form-group">
                                        <label htmlFor="Mobile">UserName</label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={username}
                                            required
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Password</label>
                                        <input
                                            type="password" // Set this to 'password' for better security
                                            name="password"
                                            value={password}
                                            required
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <button className="form-submit-btn" type="submit" onClick={this.handleSubmit}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {loading ? (
                    <center>
                        <div className="loader loading">
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                        </div>
                    </center>
                ) : usersData.length > 0 && tableOpen ? (
                    <div className="container">
                        <center>

                            <button class="Btn" onClick={this.handleLogout}>
                                <div class="sign">
                                    <svg viewBox="0 0 512 512">
                                        <path
                                            d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                                        ></path>
                                    </svg>
                                </div>

                                <div class="text">Logout</div>
                            </button>
                        </center>


                        {/* <button >Logout</button> Logout button */}
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Name</th>
                                    <th>Mobile</th>
                                    <th>Service</th>
                                    <th>Age</th>
                                    <th>Dob</th>
                                    <th>Positive Feedback</th>
                                    <th>Negative Feedback</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersData.map((ival, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{ival.name}</td>
                                        <td>{ival.mobile}</td>
                                        <td>{ival.serviceType}</td>
                                        <td>{ival.age}</td>
                                        <td>{ival.dob}</td>
                                        <td>{ival.pF}</td>
                                        <td>{ival.nF}</td>
                                        <td>{ival.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : null}
            </>
        );
    }
}

export default DataList;

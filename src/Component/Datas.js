import React from "react";
import "./form.css";
import api from "../APIS/api";
import DataTable from "../Dynamic/Datatable";
import { Chart } from "react-google-charts";
// import ReactTable from 'react-table';
// import 'react-table/react-table.css';


class DataList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            usersData: [],
            OffersData: [],
            tableOpen: false,
            loading: false,
            page: 1,
            isAuthenticated: false, // Track if the user is authenticated
            columns: [
                {
                    Header: 'Name',
                    accessor: 'name' // String-based value accessors!
                }, {
                    Header: 'Age',
                    accessor: 'age',

                }, {
                    Header: 'Mobile',
                    accessor: 'mobile' // String-based value accessors!
                }, {
                    Header: 'Service Type',
                    accessor: 'serviceType',

                },
                {
                    Header: 'DOB',
                    accessor: 'dob' // String-based value accessors!
                }, {
                    Header: 'Feedback',
                    accessor: 'pF',

                },
            ],
            offersColumns: [
                {
                    Header: 'Send',
                    accessor: 'hhh',
                    Cell: ({ row }) => (
                        <button
                            className='sendBtn'
                            onClick={() => this.sendOffersMsg(row.original)} // Pass the row data to sendOffersMsg
                        >
                            Send
                        </button>
                    )
                    // String-based value accessors!
                },
                {
                    Header: 'Name',
                    accessor: 'name' // String-based value accessors!
                }, {
                    Header: 'Age',
                    accessor: 'age',

                }, {
                    Header: 'Mobile',
                    accessor: 'mobile' // String-based value accessors!
                }, {
                    Header: 'Service Type',
                    accessor: 'serviceType',

                },
                {
                    Header: 'DOB',
                    accessor: 'dob' // String-based value accessors!
                }, {
                    Header: 'Feedback',
                    accessor: 'pF',

                },
            ]
        };
    }
    sendOffersMsg = async (rowData) => {
        const result = await api.sendMsg(rowData);

        if (result && result.data) {
            // Creating a message with URL encoding for spaces and special characters
            let message = `Happy%20Birthday%20${encodeURIComponent(rowData.name)}!🎉%20This%20month,%20enjoy%20an%20exclusive%20offer%20at%20Servesh%20Saloon%20just%20for%20you.Visit%20us%20and%20celebrate%20in%20style!`;

            // Formulating the WhatsApp URL with the message
            let link = `https://wa.me/91${rowData.mobile}?text=${message}`;

            // Navigating to WhatsApp (opening the URL in a new tab or window)
            window.open(link, "_blank");
        }

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
            console.log("enter 1");

            const result = await api.getData();
            console.log(result, "result");

            if (result && result.data) {
                console.log("enter 2");

                this.setState({ usersData: result.data });
                console.log(result.data, "result.data");
                const currentMonth = new Date().getMonth() + 1; // Current month (1-12)
                const filteredData = result.data.filter(item => {
                    const dobMonth = new Date(item.dob).getMonth() + 1; // Extract month from 'dob'
                    return dobMonth === currentMonth;
                });
                console.log("enter 3");

                if (filteredData) {
                    this.setState({ OffersData: filteredData })
                }
                console.log("enter 4");

                console.log(filteredData, "filteredData");
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
    menuButtonChange = () => {
        const menuButton = document.getElementById('menuButton');
        const sideNavbar = document.getElementById('sidebar');
        const headingHide = document.getElementById('heading');

        const navbarList = document.getElementById('navbarUlList');
        const heading = document.getElementById('heading');



        menuButton.addEventListener('click', () => {
            // Check the current width of the sidebar
            if (sideNavbar.style.width === "200px" || sideNavbar.style.width === "") {
                // Collapse the sidebar
                sideNavbar.style.width = "50px";
                headingHide.style.display = "none";
                menuButton.classList.remove("active");
                menuButton.style.position = "static";
                navbarList.style.display = "none";


            } else {
                // Expand the sidebar
                sideNavbar.style.width = "200px";
                headingHide.style.display = "block";
                menuButton.classList.add("active");
                menuButton.style.position = "relative";
                navbarList.style.display = "block";
                heading.style.textAlign = "left"

            }
        });

    }
    render() {
        const { username, password, usersData, tableOpen, loading, isAuthenticated } = this.state;
        let WIDTH = window.innerWidth
        console.log(WIDTH, "WIDTH");
        const data = [
            ["Task", "Hours per Day"],
            ["Hair cut", 9],
            ["Massage", 2],
            ["Beard trim", 2],
            ["Facial", 2],
            ["Shave", 7],
        ];

        const options = {
            // title: "My Daily Activities",
        };
        const BarData = [
            ["Month", "Customer Count", { role: "style" }],
            ["Jan", 30, "color: #76A7FA"], // January: 30 customers
            ["Feb", 20, "color: #FF5733"], // February: 20 customers
            ["Mar", 20, "color: #F4C542"], // March: 20 customers
            ["Apr", 50, "color: #34A853"], // April: 50 customers
            ["May", 40, "color: #4285F4"], // May: 40 customers
            ["Jun", 35, "color: #EA4335"], // June: 35 customers
        ];

        // Chart options
        const BarOptions = {
            // title: "Monthly Saloon Customer Count",
            chartArea: { width: "60%" },
            hAxis: {
                title: "Customers",
                minValue: 0,
            },
            vAxis: {
                title: "Month",
            },
            legend: "none", // Hides the legend
        };

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
                    <div className="containerd">
                        <div class="sidebar" id="sidebar">
                            <h2 style={{ textAlign: WIDTH > 768 ? "center" : "left" }} id="heading"><span style={{ color: "#d500ea" }}>SARVESH</span>  SALOON</h2>
                            {WIDTH < 768 ?
                                <>
                                    <div class="menu-button active" id="menuButton" onClick={this.menuButtonChange}>
                                        <div class="menu-line line1"></div>
                                        <div class="menu-line line2"></div>
                                        <div class="menu-line line3"></div>
                                    </div>
                                </> :
                                <>
                                </>}

                            <ul id="navbarUlList">
                                <li><a href="#dashboard" onClick={() => this.setState({ page: 1 })}>Dashboard</a></li>
                                <li><a href="#user-details" onClick={() => this.setState({ page: 2 })}>User Details</a></li>
                                <li><a href="#offers" onClick={() => this.setState({ page: 3 })}>Offers</a></li>

                            </ul>
                        </div>
                        <div class="main-content">
                            {this.state.page === 1 ?
                                <>
                                    <div id="dashboard">
                                        <h1>Dashboard</h1>
                                        <p>Welcome to the dashboard page.</p>
                                        <div className="card">
                                            <h2>Monthly Saloon Customer Count</h2>
                                            <Chart
                                                chartType="ColumnChart"
                                                data={BarData}
                                                options={BarOptions}
                                                width="100%"
                                                height="400px"
                                            />
                                        </div>
                                        <div className="card">
                                            {/* <h2>Google Chart Example</h2> */}
                                            <Chart
                                                chartType="PieChart"
                                                data={data}
                                                options={options}
                                                width={"100%"}
                                                height={"400px"}
                                            />
                                        </div>


                                    </div>
                                </> : this.state.page === 2 ?
                                    <>
                                        <div id="user-details">
                                            <div>

                                                <h1>User Details</h1>
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

                                                <div>
                                                    <DataTable
                                                        data={this.state.usersData}
                                                        columns={this.state.columns}
                                                    />
                                                    {/* <table>
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
                                                    </table> */}
                                                </div>
                                            </div>

                                        </div>

                                    </> : this.state.page === 3 ? <>
                                        <div id="offecrs">
                                            <h1>Offers</h1>
                                            <div>

                                                {/* <h1>User Details</h1> */}
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

                                                <div>
                                                    <DataTable
                                                        data={this.state.OffersData}
                                                        columns={this.state.offersColumns}
                                                    />
                                                    {/* <table>
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
                                                    </table> */}
                                                </div>
                                            </div>
                                        </div>
                                    </> :
                                        <>

                                        </>}



                        </div>
                        {/* <center>

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
                        </table> */}
                    </div>
                ) : null}
            </>
        );
    }
}

export default DataList;


import React from "react";
import "./form.css"
import api from "../APIS/api";
import Image1 from "../PNG.jpg"

class FormPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Mobile: "",
            Name: "",
            Age: "",
            ServiceType: "",
            Dob: "",
            PFeedback: "",
            NFeedback: "",
            // succesFormsubmit: false,
             errors: {}, // To store validation errors
            succesFormsubmit: false,

        }

    }
    handlChange = (e) => {
        const { name, value } = e.target;
        let { usersData } = this.state;
        console.log(`${name}: ${value}`); // Log field changes for debugging

        // Update state for the current field
        this.setState({ [name]: value });

        // Validation for Mobile number
        if (name === "Mobile") {
            if (!/^\d{10}$/.test(value)) {
                console.log("Invalid mobile number. Please enter a 10-digit number.");
                return; // Return early if validation fails
            }

            let getData = [];
            let wait = usersData && usersData.map((user) => {
                if (value === user.mobile) {
                    getData.push(user);
                }
            });

            Promise.all(wait).then(() => {
                if (getData.length) {
                    this.setState({
                        Name: getData[0].name || "",
                        Age: getData[0].age || "",
                        Dob: getData[0].dob || "",
                    });
                    console.log("Data prefilled:", getData[0]);
                } else {
                    console.log("No user data found for this mobile number.");
                }
            });
        }

        // Automatically calculate and update Age from DOB
        if (name === "Dob") {
            const today = new Date();
            const birthDate = new Date(value);

            if (birthDate > today) {
                console.log("Invalid Date of Birth: cannot be in the future.");
                return; // Return early for invalid DOB
            }

            const age = today.getFullYear() - birthDate.getFullYear();
            const isBirthdayPassed =
                today.getMonth() > birthDate.getMonth() ||
                (today.getMonth() === birthDate.getMonth() &&
                    today.getDate() >= birthDate.getDate());
            const calculatedAge = isBirthdayPassed ? age : age - 1;

            this.setState({ Age: calculatedAge > 0 ? calculatedAge : "" });
            console.log(`Calculated Age: ${calculatedAge}`);
        }
    }
    handlSubmit = async () => {
        const { Mobile, Name, Age, ServiceType, Dob, PFeedback, NFeedback } = this.state;
        let errors = {};

        // Final validation checks
        if (!Mobile) errors.Mobile = "Mobile number is required.";
        if (!Name) errors.Name = "Name is required.";
        if (!Age) errors.Age = "Age is required.";
        if (!Dob) errors.Dob = "Date of birth is required.";
        if (!ServiceType) errors.ServiceType = "Service type is required.";
        if (!PFeedback) errors.PFeedback = "Feedback is required.";

        if (Object.keys(errors).length > 0) {
            this.setState({ errors });
            return; // Stop form submission
        }

        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0");
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const year = today.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;

        const formData = {
            mobile: Mobile,
            name: Name,
            age: Age,
            servicetype: ServiceType,
            dob: Dob,
            pF: PFeedback,
            date: formattedDate
        };

        try {
            const result = await api.signup(formData);
            console.log(result, "result");
            if (result) {
                window.scrollTo(500, 0);
                this.setState({
                    Mobile: "",
                    Name: "",
                    Age: "",
                    ServiceType: "",
                    Dob: "",
                    PFeedback: "",
                    NFeedback: "",
                    succesFormsubmit: true,
                    errors:{}
                    
                });
                setTimeout(() => {
                    this.setState({ succesFormsubmit: false });
                }, 3000);
            }
        } catch (error) {
            console.log(error, "error");
        }

    }
    async componentDidMount() {

        this.fetchData(); // Fetch data without opening the login modal
    }
    calculateAge = () => {
        const { Dob } = this.state;

        if (Dob) {
            const dob = new Date(Dob);
            const today = new Date();
            const age = today.getFullYear() - dob.getFullYear();
            const month = today.getMonth() - dob.getMonth();

            // If the DOB month is greater than today's month or the same but the day hasn't passed, subtract 1 from age
            if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) {
                this.setState({ Age: age - 1 });
            } else {
                this.setState({ Age: age });
            }
        }
    };

    fetchData = async () => {

        try {
            const result = await api.getData();
            if (result && result.data) {
                this.setState({ usersData: result.data });
                // console.log(result.data, "result.data");
                // const currentMonth = new Date().getMonth() + 1; // Current month (1-12)
                // const filteredData = result.data.filter(item => {
                //     const dobMonth = new Date(item.dob).getMonth() + 1; // Extract month from 'dob'
                //     return dobMonth === currentMonth;
                // });
                // if (filteredData) {
                //     this.setState({ OffersData: filteredData })
                // }
                // console.log(filteredData, "filteredData");
            }
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            this.setState({ loading: false });
        }
    };
    render() {
        console.log("enter form page");
        const { Mobile, Name, Age, ServiceType, Dob, PFeedback, errors, succesFormsubmit } = this.state;
        return (
            <>
                {this.state.succesFormsubmit &&

                    <div class="success">
                        <div class="success__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none"><path fill-rule="evenodd" fill="#FFFFFF" d="m12 1c-6.075 0-11 4.925-11 11s4.925 11 11 11 11-4.925 11-11-4.925-11-11-11zm4.768 9.14c.0878-.1004.1546-.21726.1966-.34383.0419-.12657.0581-.26026.0477-.39319-.0105-.13293-.0475-.26242-.1087-.38085-.0613-.11844-.1456-.22342-.2481-.30879-.1024-.08536-.2209-.14938-.3484-.18828s-.2616-.0519-.3942-.03823c-.1327.01366-.2612.05372-.3782.1178-.1169.06409-.2198.15091-.3027.25537l-4.3 5.159-2.225-2.226c-.1886-.1822-.4412-.283-.7034-.2807s-.51301.1075-.69842.2929-.29058.4362-.29285.6984c-.00228.2622.09851.5148.28067.7034l3 3c.0983.0982.2159.1748.3454.2251.1295.0502.2681.0729.4069.0665.1387-.0063.2747-.0414.3991-.1032.1244-.0617.2347-.1487.3236-.2554z" clip-rule="evenodd"></path></svg>
                        </div>
                        <div class="success__title">Successfully submitted</div>
                        {/* <div class="success__close"><svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 20" height="20"><path fill="#FFFFFF" d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"></path></svg></div> */}
                    </div>
                }
                <div className="formPage">
                    <div className="form-container">
                        <img src={Image1}/>
                        {/* <h2 style={{ textAlign: "center" }}>SARVESH SALOON</h2> */}
                        <h5 style={{ textAlign: "center", color: "#ff0fec" }}>
                            PLEASE FILL THESE DETAILS FOR MY REFERENCE
                        </h5>

                        <div className="form-group">
                            <label htmlFor="Mobile">Mobile</label>
                            <input
                                type="number"
                                name="Mobile"
                                value={Mobile}
                                required
                                onChange={this.handlChange}
                            />
                            {errors.Mobile && <small className="error">{errors.Mobile}</small>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="Name">Name</label>
                            <input
                                type="text"
                                name="Name"
                                value={Name}
                                required
                                onChange={this.handlChange}
                            />
                            {errors.Name && <small className="error">{errors.Name}</small>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="Dob">DOB</label>
                            <input
                                type="date"
                                name="Dob"
                                value={Dob}
                                required
                                onChange={this.handlChange}
                            />
                            {errors.Dob && <small className="error">{errors.Dob}</small>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="Age">Age</label>
                            <input
                                type="number"
                                name="Age"
                                value={Age}
                                required
                                onChange={this.handlChange}
                            />
                            {errors.Age && <small className="error">{errors.Age}</small>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="ServiceType">Service Type</label>
                            <input
                                type="text"
                                name="ServiceType"
                                value={ServiceType}
                                required
                                onChange={this.handlChange}
                            />
                            {errors.ServiceType && <small className="error">{errors.ServiceType}</small>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="textarea">Feedback</label>
                            <textarea
                                name="PFeedback"
                                rows="10"
                                cols="50"
                                required
                                value={PFeedback}
                                onChange={this.handlChange}
                            ></textarea>
                            {errors.PFeedback && <small className="error">{errors.PFeedback}</small>}
                        </div>

                        {succesFormsubmit && <p className="success">Form submitted successfully!</p>}

                        <button className="form-submit-btn" type="button" onClick={this.handlSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            </>
        )
    }
}
export default FormPage;

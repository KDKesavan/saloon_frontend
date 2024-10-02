
import React from "react";
import "./form.css"
import api from "../APIS/api";

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

        }

    }
    handlChange = (e) => {
        console.log(e, "eee");
        const { name, value } = e.target;


        this.setState({ [name]: value })
    }
    handlSubmit = async () => {
        let { Mobile, Name, Age, ServiceType, Dob, PFeedback, NFeedback } = this.state

        console.log(Mobile, "Mobile", "Name", Name, "Age", Age, "Service", ServiceType, "Dob", Dob, "PF", PFeedback, "NF", NFeedback);
        const today = new Date();

        const day = String(today.getDate()).padStart(2, '0'); // Get day and add leading zero if needed
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
        const year = today.getFullYear();

        const formattedDate = `${day}-${month}-${year}`;
        console.log(formattedDate); // Output: DD-MM-YYYY


        const formData = {
            mobile: Mobile,
            name: Name,
            age: Age,
            servicetype: ServiceType,
            dob: Dob,
            pF: PFeedback,
            nF: NFeedback,
            date: formattedDate
        };

        try {
            const result = await api.signup(formData);
            console.log(result, "result");
            if (result) {
                this.setState({
                    Mobile: "", Name: "", Age: "", ServiceType: "", Dob: "", PFeedback: "", NFeedback: ""
                })
            }
        } catch (error) {
            console.log(error, "error");
        }

    }
    render() {
        console.log("enter form page");

        return (
            <>
                <div className="formPage">
                    <div class="form-container">
                        {/* <form class="form"> */}
                        <h2 style={{ textAlign: "center" }}> SARVESH SALOON</h2>
                        <h5 style={{ textAlign: "center", color: "#ff0fec" }}> PLEASE FILL THESE DETAILS FOR MY REFERENCE</h5>

                        <div class="form-group">
                            <label for="Mobile">Mobile</label>
                            <input type="number" name="Mobile" value={this.state.Mobile} required="" onChange={this.handlChange} />
                        </div>
                        <div class="form-group">
                            <label for="email">Name</label>
                            <input type="text" name="Name" required="" value={this.state.Name} onChange={this.handlChange} />
                        </div>
                        <div class="form-group">
                            <label for="email">DOB</label>
                            <input type="date" id="email" name="Dob" required="" value={this.state.Dob} onChange={this.handlChange} />
                        </div>
                        <div class="form-group">
                            <label for="email">Age</label>
                            <input type="number" id="email" name="Age" required="" value={this.state.Age} onChange={this.handlChange} />
                        </div>
                        <div class="form-group">
                            <label for="email">Service Type</label>
                            <input type="text" id="email" name="ServiceType" required="" value={this.state.ServiceType} onChange={this.handlChange} />
                        </div>

                        <div class="form-group">
                            <label for="textarea">Postive feedback</label>
                            <textarea name="PFeedback" id="textarea" rows="10" cols="50" required="" value={this.state.PFeedback} onChange={this.handlChange}>          </textarea>
                        </div>
                        <div class="form-group">
                            <label for="textarea">Nagative feedback</label>
                            <textarea name="NFeedback" id="textarea" rows="10" cols="50" required="" value={this.state.NFeedback} onChange={this.handlChange}>          </textarea>
                        </div>
                        <button class="form-submit-btn" type="submit" onClick={this.handlSubmit}>Submit</button>
                        {/* </form> */}
                    </div>

                </div>
            </>
        )
    }
}
export default FormPage;

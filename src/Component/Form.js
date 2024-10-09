
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
            succesFormsubmit: false

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
                window.scrollTo(500, 0);
                this.setState({
                    Mobile: "", Name: "", Age: "", ServiceType: "", Dob: "", PFeedback: "", NFeedback: "", succesFormsubmit: true
                })
                setTimeout(() => {
                    this.setState({ succesFormsubmit: false });
                }, 3000);


            }
        } catch (error) {
            console.log(error, "error");
        }

    }
    render() {
        console.log("enter form page");

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

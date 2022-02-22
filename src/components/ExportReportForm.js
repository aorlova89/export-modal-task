import React, {useState} from 'react';

import './ExportReportForm.css';


export const ExportReportForm = ({ close }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const PROXY_URL = process.env.REACT_APP_PROXY_URL;

    let date = new Date();
    let currentDate = date.toISOString().substring(0,10);
    let currentTime = date.toISOString().substring(11,16);

    const initialState = {
        reportName: "",
        format: "Excel",
        email: "",
        schedule: "No Repeat",
        specificDateDay: currentDate,
        specificDateTime: currentTime,
        dailyAt: currentTime,
        weeklyDay: "wednesday",
        weeklyAt: currentTime
    }

    const [formData, setFormData] = useState(initialState);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(values => ({...values, [name]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch(`${PROXY_URL}/${BASE_URL}`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: buildRequestBody()
            });
            let resJson = await res.json();
            if (res.status === 200) {
                setFormData(initialState);
                alert("Report has been successfully exported");
                close();
            } else {
                alert("Something went wrong");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const buildRequestBody = () => {
        return JSON.stringify(
            {
                reportName: formData.reportName,
                format: formData.format,
                email: formData.email,
                schedule: formData.schedule,
                ...(formData.schedule === "Specific Date" && {specificDateDay: formData.specificDateDay}),
                ...(formData.schedule === "Specific Date" && {specificDateTime: formData.specificDateTime}),
                ...(formData.schedule === "Daily" && {dailyAt: formData.dailyAt}),
                ...(formData.schedule === "Weekly" && {weeklyDay: formData.weeklyDay}),
                ...(formData.schedule === "Weekly" && {weeklyAt: formData.weeklyAt}),
            });
    }

    const specificDateLayout = <div className="row report-date">
        <div className="col-20">
            <label>Date</label>
        </div>
        <div className="col-80">
            <input
                type="date"
                name="specificDateDay"
                value={formData.specificDateDay}
                onChange={handleChange}
            />
            at
            <input
                type="time"
                name="specificDateDay"
                value={formData.specificDateTime}
                onChange={handleChange}
            />
        </div>
    </div>;

    const dailyLayout = <div className="row report-everyday">
        <div className="col-20">
            <label>Everyday at</label>
        </div>
        <div className ="col-80">
            <input
                type="time"
                name="dailyAt"
                value={formData.dailyAt}
                onChange={handleChange}
            />
        </div>
    </div>;

    const weeklyLayout = <div className="row report-every">
        <div className="col-20">
            <label>Every</label>
        </div>
        <div className ="col-80">
            <select
                name="weeklyDay"
                value={formData.weeklyDay} onChange={handleChange}
            >
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>
            </select>
            at
            <input
                type="time"
                value={formData.weeklyAt}
                onChange={handleChange}
            />
        </div>
    </div>

    const scheduleLayout = {
        'Specific Date': specificDateLayout,
        'Daily': dailyLayout,
        'Weekly': weeklyLayout
    }


    return (
        <form onSubmit={handleSubmit}>
            <div className="row report-name">
                <div className="col-20">
                    <label>Report name</label>
                </div>
                <div className ="col-80">
                    <input
                        id="reportName"
                        type="text"
                        name="reportName"
                        placeholder="Shareable Report"
                        value={formData.reportName || ""}
                        onChange={handleChange}
                    />
                </div>

            </div>
            <div className="row report-format">
                <div className="col-20">
                    <label>Format</label>
                </div>
                <div className="col-80">
                    <label>
                        <input
                            type="radio"
                            name="format"
                            value="Excel"
                            checked={formData.format === "Excel"}
                            onChange={handleChange}
                        />
                        Excel
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="format"
                            value="CSV"
                            checked={formData.format === "CSV"}
                            onChange={handleChange}
                        />
                        CSV
                    </label>
                </div>
            </div>
            <div className="row report-email-to">
                <div className="col-20">
                    <label>E-mail to</label>
                </div>
                <div className ="col-80">
                    <input
                        type="email"
                        name="email"
                        placeholder="client@company.com"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="row report-schedule">
                <div className="col-20">
                    <label>Schedule</label>
                </div>
                <div className="col-80">
                    <label>
                        <input
                            type="radio"
                            name="schedule"
                            value="No Repeat"
                            checked={formData.schedule === "No Repeat"}
                            onChange={handleChange}
                        />
                        No Repeat
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="schedule"
                            value="Specific Date"
                            checked={formData.schedule === "Specific Date"}
                            onChange={handleChange}
                        />
                        Specific Date
                    </label>
                    {/*</div>*/}
                    <label>
                        <input
                            type="radio"
                            name="schedule"
                            value="Daily"
                            checked={formData.schedule === "Daily"}
                            onChange={handleChange}
                        />
                        Daily
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="schedule"
                            value="Weekly"
                            checked={formData.schedule === "Weekly"}
                            onChange={handleChange}
                        />
                        Weekly
                    </label>
                </div>
            </div>
            {scheduleLayout[formData.schedule]}
            <hr/>
            <div className="btn-row">
                <input
                    type="button"
                    onClick={close}
                    value="Cancel"/>
                <input
                    type="submit"
                    className={`btn ${formData.reportName && formData.email ? "active" : "disabled"}`}
                    value="Submit"
                    disabled={!(formData.reportName && formData.email)}
                />
            </div>
        </form>
    );

}

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import {
  Empty,
  Button,
  Collapse,
  Tag,
  Checkbox,
  Popover,
  Select,
  DatePicker,
} from 'antd';
const { Option } = Select;

const TwitterForm = () => {
  const [data, setData] = useState([]);
  const [rank, setRank] = useState();
  const [date, setDate] = useState();
  const { incident_id } = useParams();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKENDURL}/incidents/incident/${incident_id}`
      )
      .then(res => {
        setData(res.data);
        setRank(res.data.force_rank);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const changeRank = e => {
    setData({
      ...data,
      force_rank: e,
    });
  };

  const changeState = e => {
    setData({
      ...data,
      state: e,
    });
  };

  const changeDate = e => {
    setData({
      ...data,
      incident_date: moment(e._d)
        .format('YYYY-MM-DD')
        .toString(),
    });
  };

  const sendObj = () => {
    console.log(data);
    if (data.lat == null) {
      data.lat = 0;
      data.long = 0;
    }
    if (data.title == null) {
      data.title = 'Temp Title';
    }
    axios
      .post(
        `http://hrf-bw-labs37-dev.eba-hz3uh94j.us-east-1.elasticbeanstalk.com/form-in`,
        data
      )
      .then(res => {
        console.log(res);
        history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="form-container">
      <h2>Blue Witness TwitterBot Additional Information Form</h2>
      <div className="form-content">
        <label htmlFor="tweet" className="tweet">
          Tweet
        </label>
        <p id="tweet"> {data.description}</p>

        <label htmlFor="ranks" className="ranks">
          Rank
        </label>
        <Select
          type="text"
          name="ranks"
          className="form-inputs"
          onChange={changeRank}
          value={data.force_rank}
        >
          <Option value=""></Option>
          <Option value="Rank 1 - Police Presence">
            Rank 1 - Police Presence
          </Option>
          <Option value="Rank 2 - Empty Hand">Rank 2 - Empty-hand</Option>
          <Option value="Rank 3 - Blunt Force">Rank 3 - Blunt Force</Option>
          <Option value="Rank 4 - Chemical & Electric">
            Rank 4 - Chemical & Electric
          </Option>
          <Option value="Rank 5 - Lethal Force">Rank 5 - Lethal Force</Option>
        </Select>

        <label htmlFor="city" className="city">
          City
        </label>
        <input
          type="text"
          name="city"
          className="form-inputs"
          defaultValue={data.city}
          onChange={handleChange}
        />

        <label htmlFor="state" className="state">
          State
        </label>
        <Select
          type="text"
          name="state"
          className="form-inputs"
          onChange={changeState}
          value={data.state}
        >
          <Option value="Alabama">Alabama</Option>
          <Option value="Alaska">Alaska</Option>
          <Option value="Arizona">Arizona</Option>
          <Option value="Arkansas">Arkansas</Option>
          <Option value="California">California</Option>
          <Option value="Colorado">Colorado</Option>
          <Option value="Connecticut">Connecticut</Option>
          <Option value="Delaware">Delaware</Option>
          <Option value="Florida">Florida</Option>
          <Option value="Georgia">Georgia</Option>
          <Option value="Hawaii">Hawaii</Option>
          <Option value="Idaho">Idaho</Option>
          <Option value="Illinois">Illinois</Option>
          <Option value="Indiana">Indiana</Option>
          <Option value="Iowa">Iowa</Option>
          <Option value="Kansas">Kansas</Option>
          <Option value="Kentucky">Kentucky</Option>
          <Option value="Louisiana">Louisiana</Option>
          <Option value="Maine">Maine</Option>
          <Option value="Maryland">Maryland</Option>
          <Option value="Massachusetts">Massachusetts</Option>
          <Option value="Michigan">Michigan</Option>
          <Option value="Minnesota">Minnesota</Option>
          <Option value="Mississippi">Mississippi</Option>
          <Option value="Missouri">Missouri</Option>
          <Option value="Montana">Montana</Option>
          <Option value="Nebraska">Nebraska</Option>
          <Option value="Nevada">Nevada</Option>
          <Option value="New Hampshire">New Hampshire</Option>
          <Option value="New Jersey">New Jersey</Option>
          <Option value="New Mexico">New Mexico</Option>
          <Option value="New York">New York</Option>
          <Option value="North Carolina">North Carolina</Option>
          <Option value="North Dakota">North Dakota</Option>
          <Option value="Ohio">Ohio</Option>
          <Option value="Oklahoma">Oklahoma</Option>
          <Option value="Oregon">Oregon</Option>
          <Option value="Pennsylvania">Pennsylvania</Option>
          <Option value="Rhode Island">Rhode Island</Option>
          <Option value="South Carolina">South Carolina</Option>
          <Option value="South Dakota">South Dakota</Option>
          <Option value="Tennessee">Tennessee</Option>
          <Option value="Texas">Texas</Option>
          <Option value="Utah">Utah</Option>
          <Option value="Vermont">Vermont</Option>
          <Option value="Virginia">Virginia</Option>
          <Option value="Washington">Washington</Option>
          <Option value="West Virginia">West Virginia</Option>
          <Option value="Wisconsin">Wisconsin</Option>
          <Option value="Wyoming">Wyoming</Option>
        </Select>

        <label htmlFor="incident_date" className="incident_date">
          Date
        </label>
        {/* Potential project for upcoming cohort, we ran out of time to figure out how defaultValue works for DatePicker from antd
        Somehow, we have to be able to convert the "zulu timestamp" to a regular date statement YYYY-MM-DD. Since we were unable
        to do this, we've decided to keep the date blank for our submission. */}
        <DatePicker
          name="incident_date"
          className="form-inputs"
          onChange={changeDate}
        />
        <Button onClick={sendObj}>SUBMIT</Button>
      </div>
    </div>
  );
};
export default TwitterForm;

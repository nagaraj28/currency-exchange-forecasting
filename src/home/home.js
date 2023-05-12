import './home.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

function Home() {

    const [currency, setCurrency] = useState("inr");
    const [open, setOpen] = useState("inr");
    const [high, setHigh] = useState("inr");
    const [low, setLow] = useState("inr");
    const [isLoading,setLoading] = useState(false);
    const [predictedCloseRate, setpredictedCloseRate] = useState(-100000);
    const handleChange = (e) => {
        setCurrency(e.target.value);
      };    
  return (
    <div>
    <div className="form-header">
             <Box sx={{ minWidth: 120 }}>
      <FormControl className='select-btn' >
        <InputLabel id="demo-simple-select-label">Currency</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currency}
          label="Currency"
          onChange={handleChange}
        >
          <MenuItem value={"inr"}>INR</MenuItem>
          <MenuItem value={"jpy"}>CYT</MenuItem>
          <MenuItem value={"jpy"}>JPY</MenuItem>
        </Select>
      </FormControl>
    </Box><br/>
        <TextField className="form-header-field" id="outlined-basic" label="Open" variant="outlined" onChange ={(e)=>{
            setOpen(e.target.value)
        }
        } /><br/>
        <TextField className="form-header-field" id="outlined-basic" label="High" variant="outlined"  onChange ={(e)=>{
            setHigh(e.target.value)
        }
        } /><br/>
        <TextField className="form-header-field" id="outlined-basic" label="Low" variant="outlined"  onChange ={(e)=>{
            setLow(e.target.value)
        }
        } /><br/>
        <Button className='form-header-field btn' variant="contained" onClick={()=>{
                setLoading(true)
                axios.post('http://demo3-env.eba-psvqm4gb.us-east-2.elasticbeanstalk.com/predict', {currency,open_rate:open,high_rate:high,low_rate:low})
                .then((response) => {
                    setpredictedCloseRate(response.data.predicted_close_rate)
                    setLoading(false)
                });
        }
        }>Predict</Button>
    </div>
    {isLoading && <Box  className= "loader-cls" sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>} 
    {!isLoading && (predictedCloseRate >-100000) && <h4 className="reslt_val">The Predicted Rate  : {predictedCloseRate.toFixed(2)} {currency.toUpperCase()}</h4>}
    </div>
  );
}

export default Home;
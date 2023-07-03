
import React, { Fragment, useState } from 'react';
import { Dialog, Grid, } from '@mui/material'
import Image from 'next/image';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';



const CalenderPopup = ({ maxWidth, open, onClose}) => {

    const [value, onChange] = useState(new Date());
    
    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={onClose}
                className="modalWrapper quickview-dialog"
                maxWidth={maxWidth}
            >
                <Grid className="modalBody modal-body">
                    <button className='modal-close' onClick={onClose}><i className='fa fa-close'></i></button>
                    <Calendar onChange={onChange} value={value} />
                </Grid>
            </Dialog>
        </Fragment>
    );
}
export default CalenderPopup


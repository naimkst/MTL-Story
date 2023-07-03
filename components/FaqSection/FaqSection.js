import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Slide } from "react-awesome-reveal";

const FaqSection = (props) => {

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    return (
        <div className="faq-section section-padding">
            <div className="container-fluid">
                <Slide direction='up' triggerOnce='false'>
                    <div className="section-title">
                        <h2>FAQ's</h2>
                    </div>
                </Slide>
                <div className="faq-wrap">
                    <Slide direction='up' triggerOnce='false'>
                        <h4>Original Content Creation</h4>
                    </Slide>
                    <div className="row">
                        <div className="col-lg-12 col-12">
                            <div className="benefits-item">
                                <Slide cascade direction='up' triggerOnce='false'>
                                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                        <AccordionSummary
                                            expandIcon={""}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                        >
                                            <Typography>On which Social Media platforms does MTLStories post the content?</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                Pellentesque sit tortor eu proin at commodo. Penatibus eu sed at tincidunt fermentum id nulla sed. Et nunc massa nam fringilla. In eros, proin purus, auctor arcu ultricies elit semper lobortis. Amet vel faucibus risus eget ante lectus faucibus.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                        <AccordionSummary
                                            expandIcon={""}
                                            aria-controls="panel2bh-content"
                                            id="panel2bh-header"
                                        >
                                            <Typography>Will MTLStories post a video or piece of content that i created?</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                Pellentesque sit tortor eu proin at commodo. Penatibus eu sed at tincidunt fermentum id nulla sed. Et nunc massa nam fringilla. In eros, proin purus, auctor arcu ultricies elit semper lobortis. Amet vel faucibus risus eget ante lectus faucibus.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                                        <AccordionSummary
                                            expandIcon={""}
                                            aria-controls="panel3bh-content"
                                            id="panel3bh-header"
                                        >
                                            <Typography> who is our demographic?</Typography>

                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                Pellentesque sit tortor eu proin at commodo. Penatibus eu sed at tincidunt fermentum id nulla sed. Et nunc massa nam fringilla. In eros, proin purus, auctor arcu ultricies elit semper lobortis. Amet vel faucibus risus eget ante lectus faucibus.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                                        <AccordionSummary
                                            expandIcon={""}
                                            aria-controls="panel4bh-content"
                                            id="panel4bh-header"
                                        >
                                            <Typography> What is our policy with hiding the likes?</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                Pellentesque sit tortor eu proin at commodo. Penatibus eu sed at tincidunt fermentum id nulla sed. Et nunc massa nam fringilla. In eros, proin purus, auctor arcu ultricies elit semper lobortis. Amet vel faucibus risus eget ante lectus faucibus.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </Slide>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="faq-wrap">
                    <Slide direction='up' triggerOnce='false'>
                        <h4>Weekly MTLStories Newsletter</h4>
                    </Slide>
                    <div className="row">
                        <div className="col-lg-12 col-12">
                            <div className="benefits-item">
                                <Slide cascade direction='up' triggerOnce='false'>
                                    <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                                        <AccordionSummary
                                            expandIcon={""}
                                            aria-controls="panel5bh-content"
                                            id="panel5bh-header"
                                        >
                                            <Typography>MTLStories VS A contemporary local paper magazine, what is better for me?</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                Pellentesque sit tortor eu proin at commodo. Penatibus eu sed at tincidunt fermentum id nulla sed. Et nunc massa nam fringilla. In eros, proin purus, auctor arcu ultricies elit semper lobortis. Amet vel faucibus risus eget ante lectus faucibus.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                                        <AccordionSummary
                                            expandIcon={""}
                                            aria-controls="panel6bh-content"
                                            id="panel6bh-header"
                                        >
                                            <Typography>How interactive is MTLStories Newsletter reallY??</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                Pellentesque sit tortor eu proin at commodo. Penatibus eu sed at tincidunt fermentum id nulla sed. Et nunc massa nam fringilla. In eros, proin purus, auctor arcu ultricies elit semper lobortis. Amet vel faucibus risus eget ante lectus faucibus.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                                        <AccordionSummary
                                            expandIcon={""}
                                            aria-controls="panel7bh-content"
                                            id="panel7bh-header"
                                        >
                                            <Typography>Can my page be longer than a standard 8.5x11 size?</Typography>

                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                Pellentesque sit tortor eu proin at commodo. Penatibus eu sed at tincidunt fermentum id nulla sed. Et nunc massa nam fringilla. In eros, proin purus, auctor arcu ultricies elit semper lobortis. Amet vel faucibus risus eget ante lectus faucibus.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                                        <AccordionSummary
                                            expandIcon={""}
                                            aria-controls="panel8bh-content"
                                            id="panel8bh-header"
                                        >
                                            <Typography>Can the page be linked to my website, or to specific products on my wesbite?</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                Pellentesque sit tortor eu proin at commodo. Penatibus eu sed at tincidunt fermentum id nulla sed. Et nunc massa nam fringilla. In eros, proin purus, auctor arcu ultricies elit semper lobortis. Amet vel faucibus risus eget ante lectus faucibus.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
                                        <AccordionSummary
                                            expandIcon={""}
                                            aria-controls="panel9bh-content"
                                            id="panel9bh-header"
                                        >
                                            <Typography> Do I get a preview before its gets posted?</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                Pellentesque sit tortor eu proin at commodo. Penatibus eu sed at tincidunt fermentum id nulla sed. Et nunc massa nam fringilla. In eros, proin purus, auctor arcu ultricies elit semper lobortis. Amet vel faucibus risus eget ante lectus faucibus.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </Slide>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="faq-wrap">
                    <Slide direction='up' triggerOnce='false'>
                        <h4>Events Calendar</h4>
                    </Slide>
                    <div className="row">
                        <div className="col-lg-12 col-12">
                            <div className="benefits-item">
                                <Slide cascade direction='up' triggerOnce='false'>
                                    <Accordion expanded={expanded === 'panel10'} onChange={handleChange('panel10')}>
                                        <AccordionSummary
                                            expandIcon={""}
                                            aria-controls="panel5bh-content"
                                            id="panel5bh-header"
                                        >
                                            <Typography>MTLStories VS A contemporary local paper magazine, what is better for me?</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                Pellentesque sit tortor eu proin at commodo. Penatibus eu sed at tincidunt fermentum id nulla sed. Et nunc massa nam fringilla. In eros, proin purus, auctor arcu ultricies elit semper lobortis. Amet vel faucibus risus eget ante lectus faucibus.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion expanded={expanded === 'panel11'} onChange={handleChange('panel11')}>
                                        <AccordionSummary
                                            expandIcon={""}
                                            aria-controls="panel6bh-content"
                                            id="panel6bh-header"
                                        >
                                            <Typography>How interactive is MTLStories Newsletter reallY??</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                Pellentesque sit tortor eu proin at commodo. Penatibus eu sed at tincidunt fermentum id nulla sed. Et nunc massa nam fringilla. In eros, proin purus, auctor arcu ultricies elit semper lobortis. Amet vel faucibus risus eget ante lectus faucibus.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion expanded={expanded === 'panel12'} onChange={handleChange('panel12')}>
                                        <AccordionSummary
                                            expandIcon={""}
                                            aria-controls="panel7bh-content"
                                            id="panel7bh-header"
                                        >
                                            <Typography>Can my page be longer than a standard 8.5x11 size?</Typography>

                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                Pellentesque sit tortor eu proin at commodo. Penatibus eu sed at tincidunt fermentum id nulla sed. Et nunc massa nam fringilla. In eros, proin purus, auctor arcu ultricies elit semper lobortis. Amet vel faucibus risus eget ante lectus faucibus.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion expanded={expanded === 'panel13'} onChange={handleChange('panel13')}>
                                        <AccordionSummary
                                            expandIcon={""}
                                            aria-controls="panel8bh-content"
                                            id="panel8bh-header"
                                        >
                                            <Typography>Can the page be linked to my website, or to specific products on my wesbite?</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                Pellentesque sit tortor eu proin at commodo. Penatibus eu sed at tincidunt fermentum id nulla sed. Et nunc massa nam fringilla. In eros, proin purus, auctor arcu ultricies elit semper lobortis. Amet vel faucibus risus eget ante lectus faucibus.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion expanded={expanded === 'panel14'} onChange={handleChange('panel14')}>
                                        <AccordionSummary
                                            expandIcon={""}
                                            aria-controls="panel9bh-content"
                                            id="panel9bh-header"
                                        >
                                            <Typography> Do I get a preview before its gets posted?</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                Pellentesque sit tortor eu proin at commodo. Penatibus eu sed at tincidunt fermentum id nulla sed. Et nunc massa nam fringilla. In eros, proin purus, auctor arcu ultricies elit semper lobortis. Amet vel faucibus risus eget ante lectus faucibus.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </Slide>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default FaqSection;
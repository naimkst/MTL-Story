import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Slide } from "react-awesome-reveal";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={''}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const ServiceSection = () => {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <div className="service-area section-padding" id='service'>
        <div className="container-fluid">
          <Slide direction='up' triggerOnce='false'>
            <div className="section-title">
              <h2>OUR SERVICES</h2>
            </div>
          </Slide>
          <div className="service-wrap">
            <div className="row align-items-center">
              <div className="service-item">
                <Slide cascade direction='up' triggerOnce='false'>
                  <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                      expandIcon={""}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography>Original Content Creation</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        We never just post crappy content on our page, we create the content, so like that we can call it a piece of art regardless of what it is.. 🤭🤣 No-no all jokes aside - We will create and post an original piece of content created from scratch for your company/brand/shop, that will organically explode! through our "Montreal-Based" community
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                      expandIcon={""}
                      aria-controls="panel2bh-content"
                      id="panel2bh-header"
                    >
                      <Typography>What to expect from the first meeting with your solicitor?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        We never just post crappy content on our page, we create the content, so like that we can call it a piece of art regardless of what it is.. 🤭🤣 No-no all jokes aside - We will create and post an original piece of content created from scratch for your company/brand/shop, that will organically explode! through our "Montreal-Based" community
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                      expandIcon={""}
                      aria-controls="panel3bh-content"
                      id="panel3bh-header"
                    >
                      <Typography> Who will work on my case?</Typography>

                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        We never just post crappy content on our page, we create the content, so like that we can call it a piece of art regardless of what it is.. 🤭🤣 No-no all jokes aside - We will create and post an original piece of content created from scratch for your company/brand/shop, that will organically explode! through our "Montreal-Based" community
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
  );
}


export default ServiceSection;
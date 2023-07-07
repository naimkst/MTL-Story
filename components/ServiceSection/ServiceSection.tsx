import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Slide } from "react-awesome-reveal";

const Accordion: any = styled((props) => (
  <MuiAccordion children disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary: any = styled((props) => (
  <MuiAccordionSummary expandIcon={""} {...props} />
))(({ theme }) => ({
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const ServiceSection = ({ data }: any) => {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <div className="service-area section-padding" id="service">
        <div className="container-fluid">
          <Slide direction="up" triggerOnce={false}>
            <div className="section-title">
              <h2>{data?.SectionTitle}</h2>
            </div>
          </Slide>
          <div className="service-wrap">
            <div className="row align-items-center">
              <div className="service-item">
                <Slide cascade direction="up" triggerOnce={false}>
                  {data?.Services?.map((item: any, index: any) => (
                    <Accordion
                      key={`service-${index}`}
                      expanded={expanded === `panel${index + 1}`}
                      onChange={handleChange(`panel${index + 1}`)}
                    >
                      <AccordionSummary
                        expandIcon={""}
                        aria-controls="panel1bh-content"
                        id={`panel${index + 1}bh-header`}
                      >
                        <Typography>{item?.Title}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>{item?.Description}</Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Slide>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;

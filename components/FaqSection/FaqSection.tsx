import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Slide } from "react-awesome-reveal";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const FaqSection = ({ data }: any) => {
  const [expanded, setExpanded] = React.useState<any>(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="faq-section section-padding">
      <div className="container-fluid">
        <Slide direction="up" triggerOnce="false">
          <div className="section-title">
            <h2>{data?.SectionTitle}</h2>
          </div>
        </Slide>
        <div className="faq-wrap">
          <Slide direction="up" triggerOnce="false">
            <h4>{data?.FAQTitle}</h4>
          </Slide>
          <div className="row">
            <div className="col-lg-12 col-12">
              <div className="benefits-item">
                <Slide
                  cascade
                  direction="up"
                  triggerOnce="false"
                  duration="300"
                >
                  {data?.FAQOne?.map((item: any, index: number) => (
                    <Accordion
                      key={`faqOne-${index}`}
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
                        <Typography>
                          <ReactMarkdown>{`${item?.Description}`}</ReactMarkdown>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Slide>
              </div>
            </div>
          </div>
        </div>
        <div className="faq-wrap">
          <Slide direction="up" triggerOnce="false">
            <h4>{data?.FAQTitleTwo}</h4>
          </Slide>
          <div className="row">
            <div className="col-lg-12 col-12">
              <div className="benefits-item">
                <Slide
                  cascade
                  direction="up"
                  triggerOnce="false"
                  duration="300"
                >
                  {data?.FAQTwo?.map((item: any, index: number) => (
                    <Accordion
                      key={`faqTwo-${index}`}
                      expanded={expanded === `panels${index + 1}`}
                      onChange={handleChange(`panels${index + 1}`)}
                    >
                      <AccordionSummary
                        expandIcon={""}
                        aria-controls="panel1bh-content"
                        id={`panels${index + 1}bh-header`}
                      >
                        <Typography>{item?.Title}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <ReactMarkdown>{`${item?.Description}`}</ReactMarkdown>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Slide>
              </div>
            </div>
          </div>
        </div>
        <div className="faq-wrap">
          <Slide direction="up" triggerOnce="false">
            <h4>{data?.FAQThreeTitle}</h4>
          </Slide>
          <div className="row">
            <div className="col-lg-12 col-12">
              <div className="benefits-item">
                <Slide
                  cascade
                  direction="up"
                  triggerOnce="false"
                  duration="300"
                >
                  {data?.FAQThree?.map((item: any, index: number) => (
                    <Accordion
                      key={`faqThree-${index}`}
                      expanded={expanded === `panelThree${index + 1}`}
                      onChange={handleChange(`panelThree${index + 1}`)}
                    >
                      <AccordionSummary
                        expandIcon={""}
                        aria-controls={`panel${index + 1}bh-content`}
                        id={`panelThrees${index + 1}bh-header`}
                      >
                        <Typography>{item?.Title}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <ReactMarkdown>{`${item?.Description}`}</ReactMarkdown>
                        </Typography>
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

export default FaqSection;
